
import {authApi} from "api/api";
import {LoginDataType} from "common/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {thunkTryCatch} from "common/utils/thunkTryCatch";
import {todolActions} from "features/todolist/TodolistReducer";
import {utilsFanctionForShowError} from "common/utils/utilsFanctionForShowError";


type initialStateAuthReducerType = {
    isLoggedIn: boolean
}
const initialStateAuthReducer: initialStateAuthReducerType = {
    isLoggedIn: false
}


const login = createAppAsyncThunk<{value:boolean},{data:LoginDataType}>('auth/login',
    async (arg,thunkAPI)=>{
    return thunkTryCatch(thunkAPI, async () => {
        const {dispatch, rejectWithValue} = thunkAPI
        const respons = await  authApi.logIn(arg.data)
        if (respons.data.resultCode === 0) {
            return {value:true}
        } else {
            utilsFanctionForShowError(respons.data.messages, dispatch)
            return rejectWithValue(null)
        }
    })
    })

const logOut = createAppAsyncThunk<{value:boolean},void>('auth/logOut',
    async (arg,thunkAPI)=>{
        return thunkTryCatch(thunkAPI, async () => {
            const { dispatch,rejectWithValue} = thunkAPI
            const respons = await  authApi.logOut()
            if (respons.data.resultCode === 0) {
                dispatch(todolActions.deleteDataWhenLogOut())
                return {value:false}
            } else {
                return rejectWithValue(null)
            }
        })
    })


const slice = createSlice({
    name: 'auth',
    initialState: initialStateAuthReducer,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{value:boolean}>) {
            state.isLoggedIn = action.payload.value
        } /*  этот редьюсер для  ME запроса  он делается в санке initializeApp
        в файле appReducer  */
    },
    extraReducers:builder => {
        builder
            .addCase(logOut.fulfilled,(state,action)=>{
                state.isLoggedIn = action.payload.value
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoggedIn = action.payload.value
            })
    }
})

export const authReducer = slice.reducer

export const authActions = slice.actions

export const authThunk = {login,logOut}




