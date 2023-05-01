import {Dispatch} from "redux";
import {todolistApi} from "../api/api";
import {CommonTodolistType, FilterType, TodolistType} from "../common/types";
import {utilsFanctionForMethodCatch, utilsFanctionForShowError} from "../utils/utilsFanction";
import {setTasks} from "./TasksReducer";
import {appActions} from "./appReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialTodolState: CommonTodolistType[] = []


const slice = createSlice({
    name: 'todo',
    initialState: initialTodolState,
    reducers: {
        deleteTodolist(state, action: PayloadAction<{ idTodolist: string }>) {
            const index = state.findIndex(el => el.id === action.payload.idTodolist)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        createTodolist(state, action: PayloadAction<{
            todolist: TodolistType
        }>) {
            const newTodolist: CommonTodolistType = {...action.payload.todolist, filter: 'all', disableStatus: false}
            state.unshift(newTodolist)
        },
        changeTitleTodolist(state, action: PayloadAction<{
            idTodolist: string, editTitle: string
        }>) {
            const index = state.findIndex(el => el.id === action.payload.idTodolist)
            state[index].title = action.payload.editTitle
        },
        filterTodolist(state, action: PayloadAction<{
            idTodolist: string, valueFilter: FilterType
        }>) {
            const todolist = state.find(todol => todol.id === action.payload.idTodolist)
            if (todolist) {
                todolist.filter = action.payload.valueFilter
            }
        },
        changeDisabledStatus(state, action: PayloadAction<{
            idTodolist: string, disableValue: boolean
        }>) {
            const index = state.findIndex(el => el.id === action.payload.idTodolist)
            state[index].disableStatus = action.payload.disableValue
        },
        setTodolists(state, action: PayloadAction<{
            todolists: TodolistType[]
        }>) {
            return action.payload.todolists.map(el => {
                return {...el, filter: 'all', disableStatus: false}
            })
        },
        deleteDataWhenLogOut(state, action: PayloadAction<{}>) {
            state = []
        },
    }
})

export const todolistReducer = slice.reducer

export const todolActions = slice.actions



export const changeTitleTodolistTC = (idTodolist: string, editTitle: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setLoading({valueLoading: 'loading'}))
    todolistApi.updateTodolist(idTodolist, editTitle)
        .then((respons) => {
            if (respons.data.resultCode === 0) {
                dispatch(todolActions.changeTitleTodolist({idTodolist, editTitle}))
                dispatch(appActions.setLoading(
                    {valueLoading: 'finishLoading'}))
            } else {
                utilsFanctionForShowError(respons.data.messages, dispatch)
            }

        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}


export const deleteTodolistTC = (idTodolist: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setLoading({valueLoading: 'loading'}))
    dispatch(todolActions.changeDisabledStatus({idTodolist,disableValue:true}))
    todolistApi.deleteTodolist(idTodolist)
        .then((respons) => {
            dispatch(todolActions.deleteTodolist({idTodolist}))
            dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            dispatch(todolActions.changeDisabledStatus(
                {idTodolist,disableValue:false}))
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}

export const createTodolistTC = (text: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setLoading({valueLoading: 'loading'}))
    todolistApi.createTodolist(text)
        .then((respons) => {
            if (respons.data.resultCode === 0) {
                dispatch(todolActions.createTodolist(
                    {todolist:respons.data.data.item}))
                dispatch(appActions.setLoading(
                    {valueLoading: 'finishLoading'}))
            } else {
                utilsFanctionForShowError(respons.data.messages, dispatch)
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}


export const setTodolists = () => (dispatch: any) => {
    dispatch(appActions.setLoading({valueLoading: 'loading'}))
    todolistApi.getTodolists()
        .then((respons) => {
            dispatch(todolActions.setTodolists({todolists:respons.data}))
            dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            return respons.data   /* todolists: TodolistType[]*/
        })
        .then((todolArray) => {
            todolArray.forEach(el => dispatch(setTasks(el.id)))
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })

}