
import {createTodolistACType, deleteTodolistACType, setTodolistsACType} from "./TodolistReducer";
import {Dispatch} from "redux";
import {taskApi} from "../api/api";
import {TaskType} from "../common/types";


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
        case "Task/SET-TASKS":{
            let copyStateTasks = {...state}
            copyStateTasks[action.idTodolist]=action.tasks
            return copyStateTasks
        }

        case 'Task/CHANGE-TITLE' : {
            return {
                ...state, [action.idTodolist]: state[action.idTodolist].map(
                    e => e.id === action.idTask ? {...e, title: action.editTitle} : e)
            }
        }
/*        case "Task/CREATE-TASK": {
            return {
                ...state, [action.idTodolist]: [
                    {description: '',
                        title: action.title,
                        status: TaskStatus.New,
                        priority: 0,
                        startDate: '',
                        deadline: '',
                        id: action.taskId,
                        todoListId: action.todolId,
                        order: 0,
                        addedDate: ''
                    }, ...state[action.todolId]
                ]
            }
        }*/
/*        case "Task/CREATE-TASK": {
            return {
                ...state, [action.idTodolist]: [
                    { description: '',
                        title: '',
                        status: TaskStatus.New,
                        priority: 0,
                        startDate: '',
                        deadline: '',
                        id: action.taskId,
                        todoListId: action.todolId,
                        order: 0,
                        addedDate: ''
                    }, ...state[action.idTodolist]
                ]
            }
        }*/

        case "Task/CHANGE-CHECKBOX": {
            return {
                ...state, [action.idTodolist]: state[action.idTodolist].map(
                    e => e.id === action.idTask ? {...e, isDone: action.valueCheckbox} : e
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
export const changeCheckboxTaskAC = (idTodolist: string, idTask: string, valueCheckbox: boolean) => {
    return {
        type: 'Task/CHANGE-CHECKBOX',
        idTodolist,
        idTask,
        valueCheckbox
    } as const
}


type createTaskACType = ReturnType<typeof createTaskAC>
export const createTaskAC = (idTodolist: string, text: string) => {
    return {
        type: 'Task/CREATE-TASK',
        idTodolist,
        text
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
export const setTaskAC = (idTodolist: string, tasks:TaskType[]) => {
    return {
        type: 'Task/SET-TASKS',
        idTodolist,
        tasks,
    } as const
}


export const setTasks = (todolistId: string) => (dispatch: Dispatch) => {
    taskApi.getTasks(todolistId)
        .then ((respons)=>{
            dispatch(setTaskAC(todolistId,respons.data.items))
    })

}