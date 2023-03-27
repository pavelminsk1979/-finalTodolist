import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionTodolistType, TodolistReducer} from "./TodolistReducer";
import {ActionTaskType, TasksReducer} from "./TasksReducer";
import {useDispatch} from "react-redux";
import thunk, {ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    todolists:TodolistReducer,
    tasks:TasksReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export type StateStoreType = ReturnType<typeof rootReducer>

export type CommonActionsType = ActionTodolistType|ActionTaskType

export type DispatchType = ThunkDispatch<StateStoreType, any, CommonActionsType>

export const useAppDispatch = ()=>useDispatch<DispatchType>()

/* @ts-ignore */
window.store = store