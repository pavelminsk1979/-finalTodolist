import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {setLoadingAC} from "./appReducer";
import {utilsFanctionForMethodCatch} from "../utils/utilsFanction";
import {LoginDataType} from "../common/types";
import {deleteDataWhenLogOutAC} from "./TodolistReducer";

const initialStateAuthReducer = {
    isLoggedIn:false
}

type initialStateAuthReducerType = {
    isLoggedIn:boolean
}

type AuthReducerActionType = setIsLoggedInACType

export const authReducer = (state:initialStateAuthReducerType=initialStateAuthReducer,action:AuthReducerActionType):initialStateAuthReducerType => {
  switch (action.type) {
      case 'auth/SET-IS-LOGGED-IN':{
          return {...state,isLoggedIn:action.value}
      }
      default:return state
  }
}


type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value:boolean) => {
    return{
        type:'auth/SET-IS-LOGGED-IN',
        value
    }as const
}

export const loginTC = (data: LoginDataType) => (dispatch:Dispatch) => {
    dispatch(setLoadingAC('loading'))
    authApi.logIn(data)
        .then((respons) => {
            if(respons.data.resultCode===0){
                dispatch(setIsLoggedInAC(true))
                dispatch(setLoadingAC('finishLoading'))
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}

export const logOutTC = () => (dispatch:Dispatch) => {
    dispatch(setLoadingAC('loading'))
    authApi.logOut()
        .then((response)=>{
            if(response.data.resultCode===0){
                dispatch(setIsLoggedInAC(false))
                dispatch(setLoadingAC('finishLoading'))
                dispatch(deleteDataWhenLogOutAC())
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}


