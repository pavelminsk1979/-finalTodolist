

export type LoadingType = 'idle'| 'loading' | 'finishLoading'

const initialState = {
    statusLoading : 'finishLoading' as LoadingType
}

export type InitialStateType = {
    statusLoading:LoadingType
}

type ActionType = setLoadingACType

export const appReducer = (state:InitialStateType = initialState,action : ActionType) : InitialStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING':{
            return {...state,statusLoading:action.valueLoading}
        }
        default:return state
    }
}

export type setLoadingACType = ReturnType<typeof setLoadingAC>
export  const setLoadingAC = (valueLoading:LoadingType) => {
  return{
      type:'APP/SET-LOADING',
      valueLoading
  }as const
}