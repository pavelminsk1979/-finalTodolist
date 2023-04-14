import {errorShowAC, setLoadingAC} from "../state/appReducer";
import {Dispatch} from "redux";


export const utilsFanctionForMethodCatch = (message:string,dispatch:Dispatch) => {
    dispatch(setLoadingAC('finishLoading'))
    dispatch(errorShowAC(message))
}

export const utilsFanctionForShowError = (messages:string[],dispatch:Dispatch) => {
    if (messages.length) {
        dispatch(errorShowAC(messages[0]))
    } else {
        dispatch(errorShowAC('Some error'))
    }
    dispatch(setLoadingAC('finishLoading'))
}