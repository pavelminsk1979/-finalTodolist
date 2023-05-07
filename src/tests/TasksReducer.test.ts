

import {StateTaskType, taskActions, tasksReducer, taskThunks} from "../state/TasksReducer";
import { TaskStatus, TaskType} from "../common/types";


let startState: StateTaskType

beforeEach(() => {
    startState = {
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
})

test('correct task should be delete', () => {
        const endState = tasksReducer(
            startState, taskThunks.deleteTask.fulfilled({
                    idTodolist: 'todolistId1',
                    idTask: '2'
                },'reguestId',{idTodolist: 'todolistId1',
                idTask: '2'}
            ))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('REACT')
    expect(endState['todolistId1'][1].title).toBe('HTML&CSS')

})


test('correct task should be change Checkbox', () => {
    const newTask = {
        title: '',
        description: '',
        status: 2,
        priority: 0,
        startDate: '',
        deadline: ''
    }
    const endState = tasksReducer(
        startState, taskActions.changeCheckboxTask({
                idTodolist: 'todolistId1',
                idTask: '2',
                item: newTask
            }
        ))

    expect(endState['todolistId1'][0].status).toBe(TaskStatus.Complete)
    expect(endState['todolistId1'][1].status).toBe(TaskStatus.Complete)
    expect(endState['todolistId1'][2].status).toBe(TaskStatus.Complete)
})


test('correct task should be change title', () => {
    const newTask = {
        title: 'I\'m Edit Title',
        description: '',
        status: 2,
        priority: 0,
        startDate: '',
        deadline: ''
    }
    const endState = tasksReducer(
        startState, taskActions.changeTitleTask({
            idTodolist: 'todolistId2', idTask: '5', item: newTask
        }))

    expect(endState['todolistId2'][0].title).toBe("I'm Edit Title")
    expect(endState['todolistId2'][1].title).toBe("YouTube")
    expect(endState['todolistId2'].length).toBe(3)
})


test('should be created new task', () => {
    const newTask:TaskType = {
        description: '',
        title: "I'm New Task",
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id: '9',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
    }
    const endState = tasksReducer(
        startState, taskThunks.createTask.fulfilled(
            {task: newTask},'reguestId',
            { idTodolist: newTask.todoListId,
                text: newTask.title }))

    expect(endState['todolistId2'][0].title).toBe("I'm New Task")
    expect(endState['todolistId2'][1].title).toBe("Rembo1")
    expect(endState['todolistId1'][0].title).toBe("REACT")
    expect(endState['todolistId2'].length).toBe(4)

})