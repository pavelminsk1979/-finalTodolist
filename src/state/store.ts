import {combineReducers} from "redux";
import {ActionTodolistType, TodolistReducer} from "./TodolistReducer";
import {ActionTaskType, TasksReducer} from "./TasksReducer";
import {useDispatch} from "react-redux";
import  {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";



const rootReducer = combineReducers({
    todolists:TodolistReducer,
    tasks:TasksReducer,
    app:appReducer,
    auth:authReducer
})

export const store = configureStore({
    reducer:rootReducer
})

/*export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))*/

export type StateStoreType = ReturnType<typeof rootReducer>

export type CommonActionsType = ActionTodolistType|ActionTaskType

export type DispatchType = ThunkDispatch<StateStoreType, any, CommonActionsType>

export const useAppDispatch = ()=>useDispatch<DispatchType>()

/* @ts-ignore */
window.store = store