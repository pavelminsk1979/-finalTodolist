import {StateTaskType} from "../Components/App";
import {createTodolistAC, deleteTodolistAC, TodolistReducer} from "../state/TodolistReducer";
import {TasksReducer} from "../state/TasksReducer";
import {CommonTodolistType} from "../common/types";


test('should be added todolist and added array task',()=>{
    const startTaskState: StateTaskType = {}
    const startTodolistState:  CommonTodolistType[] = []

    const action = createTodolistAC("I'm New Todol")
    const endTodolistState = TodolistReducer(startTodolistState,action)
    const endTaskState = TasksReducer(startTaskState,action)


    const finishKeys = Object.keys(endTaskState)
 /*   ---в переменную  finishKeys  попадет МАССИВ КЛЮЧЕЙ-айдишек
    -Object-это глобальный обьект
    -Object.keys---это использую метод keys
    ----Object.keys(endTaskState)---это в аргумент
    вставил ассоциативный массив--который
    будет получен после отработки РЕДЬЮСЕРА
    ----Object.keys(endTaskState)  --и этот код вернет массис
    именно ключей из ассоциативного  массива*/

    const idTask = finishKeys[0]   /*из массива с айдишками
          взял одно значение-одну айдишку и
            в переменную idTask присвоил*/
    const idTodolist = endTodolistState[0].id


    expect(idTask).toBe(action.idTodolist)
    expect(idTodolist).toBe(action.idTodolist)

})

test('correct property with tasks should be delete when delete todolist', ()=>{
     const startTaskState: StateTaskType = {
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

    const startTodolistState:  CommonTodolistType[] = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',addedData: '', order: 0},
        {id: 'todolistId2', title: 'What to watch', filter: 'all',addedData: '', order: 0},
    ]

    const action = deleteTodolistAC('todolistId2')

    const endTodolistState = TodolistReducer(startTodolistState,action)
    const endTaskState = TasksReducer(startTaskState,action)

    const finishKeys = Object.keys(endTaskState)

    expect(finishKeys.length).toBe(1)
    expect(endTaskState['todolistId1'][0].title).toBe('REACT')

    expect(endTodolistState.length).toBe(1)
    expect(endTodolistState[0].title).toBe('What to learn')
})