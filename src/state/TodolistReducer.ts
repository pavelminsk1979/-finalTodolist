import {Dispatch} from "redux";
import {todolistApi} from "../api/api";
import {CommonTodolistType, FilterType, TodolistType} from "../common/types";
import {errorShowAC, setLoadingAC} from "./appReducer";


export type ActionTodolistType =
    changeTitleTodolistACType
    | createTodolistACType
    | filterTodolistACType
    | deleteTodolistACType
    | setTodolistsACType
    | changeDisabledStatusACType

const initialTodolState: CommonTodolistType[] = []

export const TodolistReducer = (
    state: CommonTodolistType[] = initialTodolState, action: ActionTodolistType): CommonTodolistType[] => {
    switch (action.type) {
        case 'Todolist/CHANGE-TITLE': {
            return state.map(e => e.id === action.idTodolist ? {...e, title: action.editTitle} : e)
        }
        case "Todolist/CREATE-TODOLIST": {
            return [{
                id: action.idTodolist,
                title: action.text,
                filter: 'all',
                addedData: '',
                order: 0,
                disableStatus: false
            }, ...state]
        }
        case "Todolist/CHANGE-FILTER-VALUE": {
            return state.map(e => e.id === action.idTodolist ? {...e, filter: action.valueFilter} : e)
        }
        case "Todolist/DELETE-TODOLIST": {
            return state.filter(e => e.id !== action.idTodolist)
        }
        case "Todolist/SET-TODOLISTS": {
            return action.todolists.map(e => ({...e, filter: 'all', disableStatus: false}))
        }
        case "Todolist/CHANGE-DISABLE-STATUS":{
            return state.map(e=>e.id===action.idTodolist
                ?{...e,disableStatus:action.disableValue}:e)
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
export const createTodolistAC = (idTodolist: string, text: string) => {
    return {
        type: 'Todolist/CREATE-TODOLIST',
        text,
        idTodolist
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

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'Todolist/SET-TODOLISTS',
        todolists
    } as const
}

export type changeDisabledStatusACType = ReturnType<typeof changeDisabledStatusAC>
export const changeDisabledStatusAC = (idTodolist: string, disableValue: boolean) => {
    return {
        type: 'Todolist/CHANGE-DISABLE-STATUS',
        idTodolist,
        disableValue
    } as const
}


export const changeTitleTodolistTC = (idTodolist: string, editTitle: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC('loading'))
    todolistApi.updateTodolist(idTodolist, editTitle)
        .then((respons) => {
            if(respons.data.resultCode===0){
                dispatch(changeTitleTodolistAC(idTodolist, editTitle))
                dispatch(setLoadingAC('finishLoading'))
            } else {
                if(respons.data.messages.length){
                    dispatch(errorShowAC(respons.data.messages[0]))
                } else {
                    dispatch(errorShowAC('Some ERROR'))
                }
                dispatch(setLoadingAC('finishLoading'))
            }

        })
        .catch((error)=>{
            dispatch(setLoadingAC('finishLoading'))
            dispatch(errorShowAC(error.message))
        })
}


export const deleteTodolistTC = (idTodolist: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC('loading'))
    dispatch(changeDisabledStatusAC(idTodolist,true))
    todolistApi.deleteTodolist(idTodolist)
        .then((respons) => {
            dispatch(deleteTodolistAC(idTodolist))
            dispatch(setLoadingAC('finishLoading'))
            dispatch(changeDisabledStatusAC(idTodolist,false))
        })
        .catch((error)=>{
            dispatch(setLoadingAC('finishLoading'))
            dispatch(errorShowAC(error.message))
        })
}

export const createTodolistTC = (text: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC('loading'))
    todolistApi.createTodolist(text)
        .then((respons) => {
            if (respons.data.resultCode === 0) {
                dispatch(createTodolistAC(
                    respons.data.data.item.id, text))
                dispatch(setLoadingAC('finishLoading'))
            } else {
                if (respons.data.messages.length) {
                    dispatch(errorShowAC(respons.data.messages[0]))
                } else {
                    dispatch(errorShowAC('Some error'))
                }
                dispatch(setLoadingAC('finishLoading'))
            }
        })
        .catch((error)=>{
            dispatch(setLoadingAC('finishLoading'))
            dispatch(errorShowAC(error.message))
        })
}


export const setTodolists = () => (dispatch: Dispatch) => {
    dispatch(setLoadingAC('loading'))
    todolistApi.getTodolists()
        .then((respons) => {
            dispatch(setTodolistsAC(respons.data))
            dispatch(setLoadingAC('finishLoading'))
        })
        .catch((error)=>{
            dispatch(setLoadingAC('finishLoading'))
            dispatch(errorShowAC(error.message))
        })
}