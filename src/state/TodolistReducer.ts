import {FilterType, StateTodolistType} from "../App";
import {v1} from "uuid";


type ActionTodolistType = changeTitleTodolistACType | createTodolistACType | filterTodolistACType | deleteTodolistACType

const initialTodolState:StateTodolistType[]=[]

export const TodolistReducer = (
    state: StateTodolistType[]=initialTodolState, action: ActionTodolistType): StateTodolistType[] => {
    switch (action.type) {
        case 'Todolist/CHANGE-TITLE': {
            return state.map(e => e.id === action.idTodolist ? {...e, title: action.editTitle} : e)
        }
        case "Todolist/CREATE-TODOLIST": {
            return [{id: action.idTodolist, title: action.text, filter: 'all'}, ...state]
        }
        case "Todolist/CHANGE-FILTER-VALUE": {
            return state.map(e => e.id === action.idTodolist ? {...e, filter: action.valueFilter} : e)
        }
        case "Todolist/DELETE-TODOLIST": {
            return state.filter(e => e.id !== action.idTodolist)
        }

        default :
            return state
    }
}

export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (idTodolist: string) => {
    return {
        type: 'Todolist/DELETE-TODOLIST',
        idTodolist,
    } as const
}


type filterTodolistACType = ReturnType<typeof filterTodolistAC>
export const filterTodolistAC = (idTodolist: string, valueFilter: FilterType) => {
    return {
        type: 'Todolist/CHANGE-FILTER-VALUE',
        idTodolist,
        valueFilter
    } as const
}


export type createTodolistACType = ReturnType<typeof createTodolistAC>
export const createTodolistAC = (text: string) => {
    return {
        type: 'Todolist/CREATE-TODOLIST',
        text,
        idTodolist: v1()
    } as const
}

type changeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (idTodolist: string, editTitle: string) => {
    return {
        type: 'Todolist/CHANGE-TITLE',
        idTodolist,
        editTitle
    } as const
}