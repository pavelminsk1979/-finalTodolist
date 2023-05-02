import {v1} from "uuid";
import {CommonTodolistType} from "../common/types";
import {todolActions, todolistReducer} from "../state/TodolistReducer";

let todolistId1: string
let todolistId2: string

let startState: CommonTodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedData: '', order: 0, disableStatus: false},
        {id: todolistId2, title: 'What to watch', filter: 'all', addedData: '', order: 0, disableStatus: false},
    ]
})

test('correct todolist should be change valueFilter', () => {
    const newValueFilter = 'new'
    const endState = todolistReducer(
        startState, todolActions.filterTodolist(
            {
                idTodolist: todolistId1,
                valueFilter: newValueFilter
            }))

    expect(endState[0].filter).toBe('new')
    expect(endState[1].filter).toBe('all')
})


test('should be created new todolis', () => {
    const newTodolist = {
        id: 'todolist3',
        title: 'I\'m New Todolist',
        addedData: '',
        order: 0
    }
    const endState = todolistReducer(startState,
        todolActions.createTodolist({todolist: newTodolist}
        ))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("I'm New Todolist")
    expect(endState[1].title).toBe('What to learn')
})


test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState,
        todolActions.deleteTodolist({
            idTodolist: 'todolistId1'
        }))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to watch')
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be change title', () => {
    const editTitle = "I'm New Title"
    const endState = todolistReducer(
        startState, todolActions.changeTitleTodolist({
            idTodolist: 'todolistId1', editTitle: editTitle
        }))


    expect(endState[0].title).toBe("I'm New Title")
    expect(endState[1].title).toBe('What to watch')
})



