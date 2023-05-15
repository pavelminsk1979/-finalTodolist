
import {todolistApi} from "api/api";
import {CommonTodolistType, FilterType, TodolistType} from "common/types";
import {appActions} from "app/appReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {taskThunks} from "../task/TasksReducer";
import {utilsFanctionForMethodCatch} from "common/utils/utilsFanctionForMethodCatch";
import {utilsFanctionForShowError} from "common/utils/utilsFanctionForShowError";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";



const initialTodolState: CommonTodolistType[] = []

const setTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>('todo/setTodolists',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setLoading({valueLoading: 'loading'}))
            const respons = await todolistApi.getTodolists()
            dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            respons.data.forEach(el => dispatch(taskThunks.setTasks(el.id)))
            return {todolists: respons.data}
        } catch (e) {
            utilsFanctionForMethodCatch(e, dispatch)
            return rejectWithValue(null)
        }
    })


const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { text: string }>('todo/createTodolist',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setLoading({valueLoading: 'loading'}))
            const respons = await todolistApi.createTodolist(arg.text)
            if (respons.data.resultCode === 0) {
                dispatch(appActions.setLoading(
                    {valueLoading: 'finishLoading'}))
                return {todolist: respons.data.data.item}
            } else {
                utilsFanctionForShowError(respons.data.messages, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            utilsFanctionForMethodCatch(e, dispatch)
            return rejectWithValue(null)
        }
    })


const deleteTodolist = createAppAsyncThunk<{ idTodolist: string }, { idTodolist: string }>('todo/deleteTodolist',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setLoading({valueLoading: 'loading'}))
            dispatch(todolActions.changeDisabledStatus(
                {idTodolist: arg.idTodolist, disableValue: true}))
            const respons = await todolistApi.deleteTodolist(arg.idTodolist)
            dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            dispatch(todolActions.changeDisabledStatus(
                {idTodolist: arg.idTodolist, disableValue: false}))
            return {idTodolist: arg.idTodolist}
        } catch (e) {
            utilsFanctionForMethodCatch(e, dispatch)
            return rejectWithValue(null)
        }
    })


const changeTitleTodolist = createAppAsyncThunk<{idTodolist: string, editTitle: string},{idTodolist: string, editTitle: string}>('todo/changeTitleTodolist', async (arg,thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setLoading({valueLoading: 'loading'}))
        const respons = await todolistApi.updateTodolist(
            arg.idTodolist, arg.editTitle)
        if (respons.data.resultCode === 0) {
            dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            return {idTodolist:arg.idTodolist, editTitle:arg.editTitle}
        } else {
            utilsFanctionForShowError(respons.data.messages, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        utilsFanctionForMethodCatch(e, dispatch)
        return rejectWithValue(null)
    }
})



const slice = createSlice({
    name: 'todo',
    initialState: initialTodolState,
    reducers: {
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
        deleteDataWhenLogOut(state, action: PayloadAction<{}>) {
            state = []
        },
    },
    extraReducers: builder => {
        builder
            .addCase(changeTitleTodolist.fulfilled,(state,action)=>{
                const index = state.findIndex(el => el.id === action.payload.idTodolist)
                state[index].title = action.payload.editTitle

            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.idTodolist)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(setTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(el => {
                    return {...el, filter: 'all', disableStatus: false}
                })
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                const newTodolist: CommonTodolistType = {
                    ...action.payload.todolist,
                    filter: 'all',
                    disableStatus: false
                }
                state.unshift(newTodolist)
            })
    }
})

export const todolistReducer = slice.reducer

export const todolActions = slice.actions

export const todolistThunk = {setTodolists, createTodolist, deleteTodolist,changeTitleTodolist}





/*export const setTodolists = () => (dispatch: any) => {
    dispatch(appActions.setLoading({valueLoading: 'loading'}))
    todolistApi.getTodolists()
        .then((respons) => {
            dispatch(todolActions.setTodolists({todolists:respons.data}))
            dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            return respons.data   /!* todolists: TodolistType[]*!/
        })
        .then((todolArray) => {
            todolArray.forEach(el => dispatch(taskThunks.setTasks(el.id)))
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })

}*/
