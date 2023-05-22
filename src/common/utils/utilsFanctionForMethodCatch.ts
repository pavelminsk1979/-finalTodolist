import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {appActions} from "features/app/appReducer";



export const utilsFanctionForMethodCatch = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occured'
        dispatch(appActions.errorShow({error}))
    } else {
        dispatch(appActions.errorShow({error: `Native error ${err.message}`}))
    }
}