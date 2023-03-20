
import {StateTaskType} from "../Components/App";
import {changeCheckboxTaskAC, changeTitleTaskAC, createTaskAC, deleteTaskAC, TasksReducer} from "../state/TasksReducer";


let startState : StateTaskType

    beforeEach(()=>{
        startState = {
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
})

test ('correct task should be delete',()=>{
    const endState = TasksReducer(
        startState,deleteTaskAC(
            'todolistId1','2'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('REACT')
    expect(endState['todolistId1'][1].title).toBe('HTML&CSS')

})


test ('correct task should be change Checkbox',()=>{
    const endState = TasksReducer(
        startState,changeCheckboxTaskAC(
            'todolistId1','2',true))

    expect(endState['todolistId1'][0].isDone).toBe(true)
    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId1'][2].isDone).toBe(true)
})


test ('correct task should be change title',()=>{
    const editTitleForTask = "I'm Edit Title"
    const endState = TasksReducer(
        startState,changeTitleTaskAC('todolistId2','5',editTitleForTask))

    expect(endState['todolistId2'][0].title).toBe("I'm Edit Title")
    expect(endState['todolistId2'][1].title).toBe("YouTube")
    expect(endState['todolistId2'].length).toBe(3)
})


test ('should be created new task',()=>{
    const titleForNewTask = "I'm New Task"
    const endState = TasksReducer(
        startState,createTaskAC('todolistId2',titleForNewTask))

    expect(endState['todolistId2'][0].title).toBe("I'm New Task")
    expect(endState['todolistId2'][1].title).toBe("Rembo1")
    expect(endState['todolistId1'][0].title).toBe("REACT")
    expect(endState['todolistId2'].length).toBe(4)

})