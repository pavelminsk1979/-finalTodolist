import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm";

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

export type StateTaskType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<StateTodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to watch', filter: 'all'},

    ])

    const [tasks, setTasks] = useState<StateTaskType>({
        [todolistId1]: [
            {id: v1(), title: 'REACT', isDone: true},
            {id: v1(), title: 'ANGULAR', isDone: false},
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'English', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rembo1', isDone: true},
            {id: v1(), title: 'YouTube', isDone: false},
            {id: v1(), title: 'Avatar', isDone: true}
        ],
    })

    const changeTitleTask = (idTodolist: string, idTask: string, editTitle: string) => {
        setTasks({
            ...tasks, [idTodolist]: tasks[idTodolist].map(
                e => e.id === idTask ? {...e, title: editTitle} : e)
        })
    }

    const changeTitleTodolist = (idTodolist: string, editTitle: string) => {
        setTodolists(todolists.map(e => e.id === idTodolist ? {...e, title: editTitle} : e))
    }

    const createTodolistHundler = (text: string) => {
        const newTodolistId = v1()
        setTodolists([{
            id: newTodolistId, title: text, filter: 'all'
        }, ...todolists])
        setTasks({[newTodolistId]: [], ...tasks})
    }

    const createTask = (idTodolist: string, text: string) => {
        setTasks({
            ...tasks, [idTodolist]: [
                {id: v1(), title: text, isDone: false}, ...tasks[idTodolist]
            ]
        })
    }

    const changeCheckboxTask = (idTodolist: string, idTask: string, valueCheckbox: boolean) => {
        setTasks({
            ...tasks, [idTodolist]: tasks[idTodolist].map(
                e => e.id === idTask ? {...e, isDone: valueCheckbox} : e)
        })
    }

    const deleteTask = (idTodolist: string, idTask: string) => {
        setTasks({...tasks, [idTodolist]: tasks[idTodolist].filter(el => el.id !== idTask)})
    }

    const filterTodolist = (idTodolist: string, valueFilter: FilterType) => {
        setTodolists(todolists.map(el => el.id === idTodolist ? {...el, filter: valueFilter} : el))
    }

    const deleteTodolist = (idTodolist: string) => {
        setTodolists(todolists.filter(e => e.id !== idTodolist))
        delete tasks[idTodolist]
        setTasks({...tasks})
    }


    return (
        <div className="App">

            <CreateItemForm name={'NewTodolist'} callback={createTodolistHundler}/>

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
                            changeTitleTask={changeTitleTask}
                            changeTitleTodolist={changeTitleTodolist}
                            deleteTodolist={deleteTodolist}
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
