import {Dispatch} from "redux";
import {appActions} from "app/appReducer";

export const utilsFanctionForShowError = (messages: string[], dispatch: Dispatch) => {
    if (messages.length) {
        dispatch(appActions.errorShow({error: messages[0]}))
    } else {
        dispatch(appActions.errorShow({error: 'Some error'}))
    }
    /*dispatch(appActions.setLoading({valueLoading: 'finishLoading'}))*/
}