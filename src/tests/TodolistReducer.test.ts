import {v1} from "uuid";
import {StateTodolistType} from "../Components/App";
import {
    changeTitleTodolistAC,
    createTodolistAC,
    deleteTodolistAC,
    filterTodolistAC,
    TodolistReducer
} from "../state/TodolistReducer";

let todolistId1: string
let todolistId2: string

let startState: StateTodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to watch', filter: 'all'},
    ]
})

test('correct todolist should be change valueFilter', () => {
    const newValueFilter = 'new'
    const endState = TodolistReducer(
        startState, filterTodolistAC(todolistId1,newValueFilter))

    expect(endState[0].filter).toBe('new')
    expect(endState[1].filter).toBe('all')
})


test('should be created new todolis', () => {
    const newTitleForNewTodolist = "I'm New Todolist"
    const endState = TodolistReducer(startState, createTodolistAC(newTitleForNewTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("I'm New Todolist")
    expect(endState[1].title).toBe('What to learn')
})


test('correct todolist should be removed', () => {
    const endState = TodolistReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to watch')
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be change title', () => {
    const editTitle = "I'm New Title"
    const endState = TodolistReducer(
        startState, changeTitleTodolistAC(todolistId1, editTitle))


    expect(endState[0].title).toBe("I'm New Title")
    expect(endState[1].title).toBe('What to watch')
})



