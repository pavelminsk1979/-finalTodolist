
import {combineReducers} from "redux";
import {tasksReducer} from "./TasksReducer";
import {useDispatch} from "react-redux";
import  {ThunkDispatch} from "redux-thunk";
import { appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {todolistReducer} from "./TodolistReducer";
import {configureStore} from "@reduxjs/toolkit";





const rootReducer = combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app:appReducer,
    auth:authReducer
})

export const store = configureStore({
    reducer:rootReducer
})


export type StateStoreType = ReturnType<typeof rootReducer>


export type DispatchType = ThunkDispatch<StateStoreType, any, /*CommonActionsType*/any>

export const useAppDispatch = ()=>useDispatch<DispatchType>()

/* @ts-ignore */
window.store = store










