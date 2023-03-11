import React, {useReducer, useState} from 'react';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm";
import PrimarySearchAppBar from "./AppBar";
import Container from "@mui/material/Container";
import  Paper from "@mui/material/Paper";
import  Grid from "@mui/material/Grid";
import {changeCheckboxTaskAC, changeTitleTaskAC, createTaskAC, deleteTaskAC, TasksReducer} from "./state/TasksReducer";

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

    const [tasks, dispatchTasks] = useReducer(TasksReducer,{
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
        dispatchTasks(changeTitleTaskAC(idTodolist,idTask,editTitle))
    }


    const createTask = (idTodolist: string, text: string) => {
        dispatchTasks(createTaskAC(idTodolist,text))
    }

    const changeCheckboxTask = (idTodolist: string, idTask: string, valueCheckbox: boolean) => {
        dispatchTasks(changeCheckboxTaskAC(idTodolist,idTask,valueCheckbox))
    }

    const deleteTask = (idTodolist: string, idTask: string) => {
        dispatchTasks(deleteTaskAC(idTodolist,idTask))
    }








    const changeTitleTodolist = (idTodolist: string, editTitle: string) => {
        setTodolists(todolists.map(e => e.id === idTodolist ? {...e, title: editTitle} : e))
    }

    const createTodolist = (text: string) => {
        const newTodolistId = v1()
        setTodolists([{
            id: newTodolistId, title: text, filter: 'all'
        }, ...todolists])
        /*setTasks({[newTodolistId]: [], ...tasks})*/
    }

    const filterTodolist = (idTodolist: string, valueFilter: FilterType) => {
        setTodolists(todolists.map(el => el.id === idTodolist ? {...el, filter: valueFilter} : el))
    }

    const deleteTodolist = (idTodolist: string) => {
        setTodolists(todolists.filter(e => e.id !== idTodolist))
        delete tasks[idTodolist]
        /*setTasks({...tasks})*/
    }


    return (
        <div>

            <PrimarySearchAppBar/>
            <Container>
                <Grid container style={{padding:'20px'}}>
                <CreateItemForm name={'Todolist'} callback={createTodolist}/>
            </Grid>
                <Grid container spacing={3}>
                {
                    todolists.map(todol => {

                        let filterTasks = tasks[todol.id]
                        if (todol.filter === 'new') {
                            filterTasks = filterTasks.filter(task => !task.isDone)
                        } else if (todol.filter === 'completed') {
                            filterTasks = filterTasks.filter(task => task.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding:'10px'}}>
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
                        </Paper>
                        </Grid>
                    })
                }
        </Grid>
            </Container>
        </div>
    );
}

export default App;
