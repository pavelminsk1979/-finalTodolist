
import {authApi} from "api/api";
import {LoginDataType} from "common/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "app/appReducer";
import {utilsFanctionForMethodCatch} from "common/utils/utilsFanctionForMethodCatch";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";


type initialStateAuthReducerType = {
    isLoggedIn: boolean
}
const initialStateAuthReducer: initialStateAuthReducerType = {
    isLoggedIn: false
}

const login = createAppAsyncThunk<{value:boolean},{data:LoginDataType}>('auth/login',
    async (arg,thunkAPI)=>{
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setLoading({valueLoading:'loading'}))
            const respons = await  authApi.logIn(arg.data)
            if (respons.data.resultCode === 0) {
                dispatch(appActions.setLoading(
                    {valueLoading:'finishLoading'}))
                return {value:true}
            } else {
                return rejectWithValue(null)
            }
        }catch (e) {
            utilsFanctionForMethodCatch(e, dispatch)
            return rejectWithValue(null)
        }
    })


const logOut = createAppAsyncThunk<{value:boolean}>('auth/logOut',
    async (_,thunkAPI)=>{
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setLoading({valueLoading:'loading'}))
            const respons = await  authApi.logOut()
            if (respons.data.resultCode === 0) {
                dispatch(appActions.setLoading(
                    {valueLoading:'finishLoading'}))
                return {value:false}
            } else {
                return rejectWithValue(null)
            }
        }catch (e) {
            utilsFanctionForMethodCatch(e, dispatch)
            return rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: 'auth',
    initialState: initialStateAuthReducer,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{value:boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers:builder => {
        builder
            .addCase(logOut.fulfilled,(state,action)=>{
                state.isLoggedIn = action.payload.value
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoggedIn = action.payload.value
            })
    }
})

export const authReducer = slice.reducer

export const authActions = slice.actions

export const authThunk = {login,logOut}





