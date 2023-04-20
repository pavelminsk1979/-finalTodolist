import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {setLoadingAC} from "./appReducer";
import {utilsFanctionForMethodCatch} from "../utils/utilsFanction";
import {LoginDataType} from "../common/types";

const initialStateAuthReducer = {
    isLoggedIn:false
}

type initialStateAuthReducerType = {
    isLoggedIn:boolean
}

type AuthReducerActionType = setIsLoggedInACType

export const authReducer = (state:initialStateAuthReducerType=initialStateAuthReducer,action:AuthReducerActionType):initialStateAuthReducerType => {
    debugger
  switch (action.type) {
      case 'auth/SET-IS-LOGGED-IN':{
          debugger
          return {...state,isLoggedIn:action.value}
      }
      default:return state
  }
}


type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
const setIsLoggedInAC = (value:boolean) => {
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


