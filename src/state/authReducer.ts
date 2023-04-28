import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {setLoadingAC} from "./appReducer";
import {utilsFanctionForMethodCatch} from "../utils/utilsFanction";
import {LoginDataType} from "../common/types";
import {deleteDataWhenLogOutAC} from "./TodolistReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type initialStateAuthReducerType = {
    isLoggedIn: boolean
}
const initialStateAuthReducer: initialStateAuthReducerType = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialStateAuthReducer,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{value:boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions



export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC('loading'))
    authApi.logIn(data)
        .then((respons) => {
            if (respons.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value:true}))
                dispatch(setLoadingAC('finishLoading'))
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingAC('loading'))
    authApi.logOut()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value:false}))
                dispatch(setLoadingAC('finishLoading'))
                dispatch(deleteDataWhenLogOutAC())
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}


