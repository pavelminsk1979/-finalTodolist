import {StateTaskType} from "../Components/App";
import {v1} from "uuid";
import {createTodolistACType, deleteTodolistACType} from "./TodolistReducer";


export type ActionTaskType =
    changeTitleTaskACType
    | createTaskACType
    | changeCheckboxTaskACType
    | deleteTaskACType
    | createTodolistACType
    | deleteTodolistACType

const initialTaskState:StateTaskType={}

export const TasksReducer = (state: StateTaskType=initialTaskState, action: ActionTaskType): StateTaskType => {
    switch (action.type) {
        case 'Task/CHANGE-TITLE' : {
            return {
                ...state, [action.idTodolist]: state[action.idTodolist].map(
                    e => e.id === action.idTask ? {...e, title: action.editTitle} : e)
            }
        }

        case "Task/CREATE-TASK": {
            return {
                ...state, [action.idTodolist]: [
                    {id: v1(), title:  action.text, isDone: false}, ...state[action.idTodolist]]
            }
        }

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