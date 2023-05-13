import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {authActions} from "../features/auth/authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { utilsFanctionForMethodCatch } from "../common/utils/utilsFanctionForMethodCatch";



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



const slice = createSlice({
    name: 'app',
    initialState: initialStateApp,
    reducers: {
        errorShow (state, action: PayloadAction<{error: string|null}>) {
            state.error = action.payload.error
        },
        setLoading (state, action: PayloadAction<{valueLoading: LoadingType}>) {
            state.statusLoading = action.payload.valueLoading
        },
        setInitialized (state, action: PayloadAction<{isInitialized:boolean}>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})


export const appReducer = slice.reducer

export const appActions = slice.actions





export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({value:true}))
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
        .finally(()=>{
            dispatch(appActions.setInitialized({isInitialized:true}))
        })
}