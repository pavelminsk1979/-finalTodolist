import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {appActions} from "features/app/appReducer";
import {DispatchType, StateStoreType} from "features/app/store";
import {utilsFanctionForMethodCatch} from "common/utils/utilsFanctionForMethodCatch";


export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<StateStoreType, any, DispatchType, null>, logic: Function) => {
    thunkAPI.dispatch(appActions.setLoading(
        {valueLoading: 'loading'}))
    try {
        return await logic();  /* это типо логика положительного кейса*/
    } catch (e) {
        utilsFanctionForMethodCatch(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(appActions.setLoading(
            {valueLoading: 'finishLoading'}))
    }
};

