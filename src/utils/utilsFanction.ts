import {Dispatch} from "redux";
import {appActions} from "../state/appReducer";
import axios, {AxiosError} from "axios";



export const utilsFanctionForMethodCatch = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occured'
        dispatch(appActions.errorShow({error}))
    } else {
        dispatch(appActions.errorShow({error: `Native error ${err.message}`}))
    }

    dispatch(appActions.setLoading({valueLoading: 'finishLoading'}))
}


export const utilsFanctionForShowError = (messages: string[], dispatch: Dispatch) => {
    if (messages.length) {
        dispatch(appActions.errorShow(
            {error: messages[0]}))
    } else {
        dispatch(appActions.errorShow(
            {error: 'Some error'}))
    }
    dispatch(appActions.setLoading(
        {valueLoading: 'finishLoading'}))
}