


import {Dispatch} from "redux";
import {appActions} from "../state/appReducer";


export const utilsFanctionForMethodCatch = (message:string,dispatch:Dispatch) => {
    dispatch(appActions.setLoading(
        {valueLoading:'finishLoading'}))
    dispatch(appActions.errorShow(
        {errorText:message}))
}

export const utilsFanctionForShowError = (messages:string[],dispatch:Dispatch) => {
    if (messages.length) {
        dispatch(appActions.errorShow(
            {errorText:messages[0]}))
    } else {
        dispatch(appActions.errorShow(
            {errorText:'Some error'}))
    }
    dispatch(appActions.setLoading(
        {valueLoading:'finishLoading'}))
}