
import {combineReducers} from "redux";
import {useDispatch} from "react-redux";
import  {ThunkDispatch} from "redux-thunk";
import { appReducer} from "features/app/appReducer";
import {authReducer} from "features/auth/authReducer";
import {todolistReducer} from "features/todolist/TodolistReducer";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "features/task/TasksReducer";



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










