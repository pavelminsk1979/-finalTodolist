
import {authApi} from "api/api";
import {authActions} from "features/auth/authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { utilsFanctionForMethodCatch } from "common/utils/utilsFanctionForMethodCatch";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";



export type LoadingType = 'idle' | 'loading' | 'finishLoading'

export type InitialStateType = {
    statusLoading: LoadingType
    error: null | string
    isInitialized:boolean
}

const initialStateApp:InitialStateType = {
    statusLoading: 'finishLoading',
    error: null ,
    isInitialized:false
}

const initializeApp = createAppAsyncThunk<{isInitialized:true}>('app/initializeApp',
   async (arg,thunkAPI)=>{
       const {dispatch} = thunkAPI
       try {
           const respons = await authApi.me()
           if (respons.data.resultCode === 0) {
               dispatch(authActions.setIsLoggedIn({value:true}))
           }
       }catch (e) {
           utilsFanctionForMethodCatch(e, dispatch)
       }finally {
           return {isInitialized:true}
       }
   })



const slice = createSlice({
    name: 'app',
    initialState: initialStateApp,
    reducers: {
        errorShow (state, action: PayloadAction<{error: string|null}>) {
            state.error = action.payload.error
        },
        setLoading (state, action: PayloadAction<{valueLoading: LoadingType}>) {
            state.statusLoading = action.payload.valueLoading
        }
    },
    extraReducers : builder => {
        builder
            .addCase(initializeApp.fulfilled,(state,action)=>{
                state.isInitialized = action.payload.isInitialized
            })
    }
})


export const appReducer = slice.reducer

export const appActions = slice.actions

export const appThunk = {initializeApp}





