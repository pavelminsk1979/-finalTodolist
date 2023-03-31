import {createTodolistACType, deleteTodolistACType, setTodolistsACType} from "./TodolistReducer";
import {Dispatch} from "redux";
import {taskApi} from "../api/api";
import {TaskStatus, TaskType} from "../common/types";
import {StateStoreType} from "./store";


export type ActionTaskType =
    changeTitleTaskACType
    | createTaskACType
    | changeCheckboxTaskACType
    | deleteTaskACType
    | createTodolistACType
    | deleteTodolistACType
    | setTodolistsACType
    | setTaskACType

export type StateTaskType = {
    [key: string]: TaskType[]
}

const initialTaskState: StateTaskType = {}

export const TasksReducer = (state: StateTaskType = initialTaskState, action: ActionTaskType): StateTaskType => {
    switch (action.type) {
        case "Task/SET-TASKS": {
            let copyStateTasks = {...state}
            copyStateTasks[action.idTodolist] = action.tasks
            return copyStateTasks
        }

        case 'Task/CHANGE-TITLE' : {
            return {
                ...state, [action.idTodolist]: state[action.idTodolist].map(
                    e => e.id === action.idTask ? {...e, title: action.editTitle} : e)
            }
        }
        case "Task/CREATE-TASK": {
            return {
                ...state, [action.idTodolist]: [
                    {
                        description: '',
                        title: action.text,
                        status: TaskStatus.New,
                        priority: 0,
                        startDate: '',
                        deadline: '',
                        id: action.idTask,
                        todoListId: action.idTodolist,
                        order: 0,
                        addedDate: ''
                    }, ...state[action.idTodolist]
                ]
            }
        }

        case "Task/CHANGE-CHECKBOX": {
            return {
                ...state, [action.idTodolist]: state[action.idTodolist].map(
                    e => e.id === action.idTask? {...e, status: action.value} : e
                )
            }
        }

        case "Task/DELETE-TASK": {
            return {
                ...state, [action.idTodolist]: state[action.idTodolist].filter(
                    e => e.id !== action.idTask
                )
            }
        }
        case "Todolist/CREATE-TODOLIST": {
            return {[action.idTodolist]: [], ...state}
        }
        case "Todolist/DELETE-TODOLIST": {
            delete state[action.idTodolist]
            return {...state}
        }
        case "Todolist/SET-TODOLISTS": {
            let newState = {...state}
            action.todolists.map(todol => {
                return newState[todol.id] = []
            })
            return newState
        }

        default:
            return state
    }
}


type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (idTodolist: string, idTask: string) => {
    return {
        type: 'Task/DELETE-TASK',
        idTodolist,
        idTask
    } as const
}


type changeCheckboxTaskACType = ReturnType<typeof changeCheckboxTaskAC>
export const changeCheckboxTaskAC = (idTodolist: string, idTask: string, value: number) => {
    return {
        type: 'Task/CHANGE-CHECKBOX',
        idTodolist,
        idTask,
        value
    } as const
}


type createTaskACType = ReturnType<typeof createTaskAC>
export const createTaskAC = (idTodolist: string, text: string, idTask: string) => {
    return {
        type: 'Task/CREATE-TASK',
        idTodolist,
        text,
        idTask
    } as const
}

type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (idTodolist: string, idTask: string, editTitle: string) => {
    return {
        type: 'Task/CHANGE-TITLE',
        idTodolist,
        idTask,
        editTitle,
    } as const
}

type setTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (idTodolist: string, tasks: TaskType[]) => {
    return {
        type: 'Task/SET-TASKS',
        idTodolist,
        tasks,
    } as const
}



export const changeCheckboxTaskTC = (idTodolist: string, idTask: string, valueCheckbox: boolean) => (
    dispatch: Dispatch, getState: () => StateStoreType) => {
    const state = getState()
    const allTasks = state.tasks
    const taskForCorrectTodolist = allTasks[idTodolist]
    const task = taskForCorrectTodolist.find(e => e.id === idTask)
    let value:TaskStatus
    if(valueCheckbox===true){
        value=TaskStatus.Complete
    } else {value = TaskStatus.New}
    if (task) {
        taskApi.updateCheckboxTask(idTodolist, idTask, {
            title: task.title,
            description: task.description,
            status: value,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        })
            .then((respons) => {
                dispatch(changeCheckboxTaskAC(idTodolist, idTask, value))
            })
    }
}



export const changeTitleTaskTC = (idTodolist: string, idTask: string, editTitle: string) => (
    dispatch: Dispatch, getState: () => StateStoreType) => {
    const state = getState()
    const allTasks = state.tasks
    const taskForCorrectTodolist = allTasks[idTodolist]
    const task = taskForCorrectTodolist.find(e => e.id === idTask)
    if (task) {
        taskApi.updateTask(idTodolist, idTask, {
            title: editTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        })
            .then((respons) => {
                dispatch(changeTitleTaskAC(idTodolist, idTask, editTitle))
            })
    }
}


export const createTaskTC = (idTodolist: string, text: string) => (
    dispatch: Dispatch) => {
    taskApi.createTask(idTodolist, text)
        .then((respons) => {
            dispatch(createTaskAC(idTodolist, text, respons.data.data.item.id))
        })
}


export const deleteTaskTC = (idTodolist: string, idTask: string) => (
    dispatch: Dispatch) => {
    taskApi.deleteTask(idTodolist, idTask)
        .then((respons) => {
            dispatch(deleteTaskAC(idTodolist, idTask))
        })
}


export const setTasks = (todolistId: string) => (dispatch: Dispatch) => {
    taskApi.getTasks(todolistId)
        .then((respons) => {
            dispatch(setTaskAC(todolistId, respons.data.items))
        })
}