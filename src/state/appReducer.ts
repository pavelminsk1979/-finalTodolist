import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {utilsFanctionForMethodCatch} from "../utils/utilsFanction";
import {authActions} from "./authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



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
        errorShow (state, action: PayloadAction<{errorText: null | string}>) {
            state.error = action.payload.errorText
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