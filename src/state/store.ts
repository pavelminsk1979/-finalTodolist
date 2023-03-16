import {combineReducers, legacy_createStore} from "redux";
import {TodolistReducer} from "./TodolistReducer";
import {TasksReducer} from "./TasksReducer";


const rootReducer = combineReducers({
    todolists:TodolistReducer,
    tasks:TasksReducer
})

export const store = legacy_createStore(rootReducer)

export type StateStoreType = ReturnType<typeof rootReducer>

/* @ts-ignore */
window.store = store