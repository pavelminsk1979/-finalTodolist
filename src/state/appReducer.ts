import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {utilsFanctionForMethodCatch} from "../utils/utilsFanction";
import {setIsLoggedIn} from "./authReducer";


export type LoadingType = 'idle' | 'loading' | 'finishLoading'

export type InitialStateType = {
    statusLoading: LoadingType
    error: null | string
    isInitialized:boolean
}

const initialState:InitialStateType = {
    statusLoading: 'finishLoading',
    error: null ,
    isInitialized:false
}


type ActionType = setLoadingACType | errorShowACType |setInitializedACType

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING': {
            return {...state, statusLoading: action.valueLoading}
        }
        case "APP/ERROR-SHOW": {
            return {...state, error: action.errorText}
        }
        case "APP/SET-IS-INITIALIZED":{
            return {...state,isInitialized:action.isInitialized}
        }
        default:
            return state
    }
}

type errorShowACType = ReturnType<typeof errorShowAC>
export const errorShowAC = (errorText: null | string) => {
    return {
        type: 'APP/ERROR-SHOW',
        errorText
    } as const
}

export type setLoadingACType = ReturnType<typeof setLoadingAC>
export const setLoadingAC = (valueLoading: LoadingType) => {
    return {
        type: 'APP/SET-LOADING',
        valueLoading
    } as const
}

type setInitializedACType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (isInitialized:boolean) => {
    return{
        type:'APP/SET-IS-INITIALIZED',
        isInitialized
    }as const
}



export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value:true}))
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
        .finally(()=>{
            dispatch(setInitializedAC(true))
        })
}