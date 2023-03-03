import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'new' | 'completed'

export type StateTodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<StateTodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to watch', filter: 'all'},

    ])

    const [tasks, setTasks] = useState({
    [todolistId1]:[
        {id: v1(), title: 'REACT', isDone: true},
        {id: v1(), title: 'ANGULAR', isDone: false},
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'English', isDone: false},
    ],
        [todolistId2]:[
            {id: v1(), title: 'REACT', isDone: true},
            {id: v1(), title: 'ANGULAR', isDone: false},
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'English', isDone: false},
        ],
    })

    const createTask = (idTodolist: string,text: string) => {
        setTasks({...tasks,[idTodolist]:[
                {id: v1(), title: text, isDone: false},...tasks[idTodolist]
            ]})
    }

    const changeCheckboxTask = (idTodolist: string,idTask: string, valueCheckbox: boolean) => {
        setTasks({...tasks,[idTodolist]:tasks[idTodolist].map(
            e=>e.id===idTask?{...e,isDone:valueCheckbox}:e)})
    }

    const deleteTask = (idTodolist: string,idTask: string) => {
        setTasks({...tasks,[idTodolist]:tasks[idTodolist].filter(el=>el.id!==idTask)})
    }

    const filterTodolist = (idTodolist: string,valueFilter: FilterType) => {
        setTodolists(todolists.map(el=>el.id===idTodolist?{...el,filter:valueFilter}:el))
    }



    return (
        <div className="App">
            {
                todolists.map(todol => {

                    let filterTasks = tasks[todol.id]
                    if (todol.filter === 'new') {
                        filterTasks = filterTasks.filter(task => !task.isDone)
                    } else if (todol.filter === 'completed') {
                        filterTasks = filterTasks.filter(task => task.isDone)
                    }

                    return (
                        <Todolist
                            key={todol.id}
                            idTodolist={todol.id}
                            filter={todol.filter}
                            changeCheckboxTask={changeCheckboxTask}
                            createTask={createTask}
                            filterTodolist={filterTodolist}
                            deleteTask={deleteTask}
                            filterTasks={filterTasks}
                            title={todol.title}/>
                    )
                })
            }
        </div>
    );
}

export default App;
