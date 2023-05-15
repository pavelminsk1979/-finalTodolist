import {StateTaskType, tasksReducer} from "features/task/TasksReducer";
import {CommonTodolistType, TaskStatus} from "common/types";
import {todolActions, todolistReducer, todolistThunk} from "features/todolist/TodolistReducer";


test('correct property with tasks should be delete when delete todolist', () => {
    const startTaskState: StateTaskType = {
        'todolistId1': [
            {
                id: '1',
                title: 'REACT',
                status: TaskStatus.Complete,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: 1
            },
            {
                id: '2',
                title: 'ANGULAR',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: 1
            },
            {
                id: '3',
                title: 'HTML&CSS',
                status: TaskStatus.Complete,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: 1
            },
            {
                id: '4',
                title: 'English',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: 1
            },
        ],
        'todolistId2': [
            {
                id: '5',
                title: 'Rembo1',
                status: TaskStatus.Complete,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: 1
            },
            {
                id: '6',
                title: 'YouTube',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: 1
            },
            {
                id: '7',
                title: 'Avatar',
                status: TaskStatus.Complete,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: 1
            }
        ],
    }

    const startTodolistState: CommonTodolistType[] = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedData: '', order: 0, disableStatus: false},
        {id: 'todolistId2', title: 'What to watch', filter: 'all', addedData: '', order: 0, disableStatus: false},
    ]

   /* const action = todolActions.deleteTodolist({ idTodolist: 'todolistId2' })*/

    const action =  todolistThunk.deleteTodolist.fulfilled(
        {idTodolist: 'todolistId2'},'reguestId',
        {idTodolist: 'todolistId2'} )



    const endTodolistState = todolistReducer(startTodolistState, action)
    const endTaskState = tasksReducer(startTaskState, action)

    const finishKeys = Object.keys(endTaskState)

    expect(finishKeys.length).toBe(1)
    expect(endTaskState['todolistId1'][0].title).toBe('REACT')

    expect(endTodolistState.length).toBe(1)
    expect(endTodolistState[0].title).toBe('What to learn')
})