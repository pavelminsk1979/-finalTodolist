import {combineReducers, legacy_createStore} from "redux";
import {TodolistReducer} from "../../state/TodolistReducer";
import {TasksReducer} from "../../state/TasksReducer";
import {StateStoreType} from "../../state/store";
import {Provider} from "react-redux";
import {TaskStatus} from "../../common/types";

const rootReducer = combineReducers({
    todolists:TodolistReducer,
    tasks:TasksReducer
})


const initialGlobalState = {
    todolists:[
        {id: 'todolistId1', title: 'What to learn', filter: 'all',addedData: '', order: 0},
        {id: 'todolistId2', title: 'What to watch', filter: 'all',addedData: '', order: 0},
    ],
    tasks:{

        'todolistId1': [
            {id: '1', title: 'REACT', status:TaskStatus.Complete, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '2', title: 'ANGULAR', status:TaskStatus.New, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '3', title: 'HTML&CSS',status:TaskStatus.Complete, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '4', title: 'English', status:TaskStatus.New, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
        ],
        'todolistId2': [
            {id: '5', title: 'Rembo1', status:TaskStatus.Complete, todoListId:'todolistId2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '6', title: 'YouTube',status:TaskStatus.New, todoListId:'todolistId2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '7', title: 'Avatar', status:TaskStatus.Complete, todoListId:'todolistId2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1}
        ],
     /*   'todolistId1': [
            {id: '1', title: 'REACT', isDone: true},
            {id: '2', title: 'ANGULAR', isDone: false},
            {id: '3', title: 'HTML&CSS', isDone: true},
            {id: '4', title: 'English', isDone: false},
        ],
        'todolistId2': [
            {id: '5', title: 'Rembo1', isDone: true},
            {id: '6', title: 'YouTube', isDone: false},
            {id: '7', title: 'Avatar', isDone: true}
        ],*/
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