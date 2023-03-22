import {combineReducers, createStore, legacy_createStore} from "redux";
import {TodolistReducer} from "../../state/TodolistReducer";
import {TasksReducer} from "../../state/TasksReducer";
import {StateStoreType} from "../../state/store";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    todolists:TodolistReducer,
    tasks:TasksReducer
})


const initialGlobalState = {
    todolists:[
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to watch', filter: 'all'},
    ],
    tasks:{
        'todolistId1': [
            {id: '1', title: 'REACT', isDone: true},
            {id: '2', title: 'ANGULAR', isDone: false},
            {id: '3', title: 'HTML&CSS', isDone: true},
            {id: '4', title: 'English', isDone: false},
        ],
        'todolistId2': [
            {id: '5', title: 'Rembo1', isDone: true},
            {id: '6', title: 'YouTube', isDone: false},
            {id: '7', title: 'Avatar', isDone: true}
        ],
    }
}

export const storyBookStore = legacy_createStore(
    rootReducer,initialGlobalState as StateStoreType
)

export const ReduxStoreProviderDecorator = (storyFn:any)=>(
    <Provider store = {storyBookStore}>
        {storyFn()}
    </Provider>
)