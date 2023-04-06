

export type LoadingType = 'idle'| 'loading' | 'finishLoading'

const initialState = {
    statusLoading : 'finishLoading' as LoadingType,
    error:null as null | string
}

export type InitialStateType = {
    statusLoading:LoadingType
    error: null | string
}

type ActionType = setLoadingACType|errorShowACType

export const appReducer = (state:InitialStateType = initialState,action : ActionType) : InitialStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING':{
            return {...state,statusLoading:action.valueLoading}
        }
        case "APP/ERROR-SHOW":{
            return {...state,error:action.errorText}
        }
        default:return state
    }
}

type errorShowACType = ReturnType<typeof errorShowAC>
export const errorShowAC = (errorText:null|string) => {
  return{
    type:'APP/ERROR-SHOW',
    errorText
  }as const
}

export type setLoadingACType = ReturnType<typeof setLoadingAC>
export  const setLoadingAC = (valueLoading:LoadingType) => {
  return{
      type:'APP/SET-LOADING',
      valueLoading
  }as const
}