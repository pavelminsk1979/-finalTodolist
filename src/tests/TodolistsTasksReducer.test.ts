
import {createTodolistAC, deleteTodolistAC, TodolistReducer} from "../state/TodolistReducer";
import {StateTaskType, TasksReducer} from "../state/TasksReducer";
import {CommonTodolistType, TaskStatus} from "../common/types";


test('should be added todolist and added array task',()=>{
    const startTaskState: StateTaskType = {}
    const startTodolistState:  CommonTodolistType[] = []

    const action = createTodolistAC('todolist3',"I'm New Todol")
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