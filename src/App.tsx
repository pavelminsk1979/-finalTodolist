import React from 'react';
import {Todolist} from "./Todolist";
import {CreateItemForm} from "./CreateItemForm";
import PrimarySearchAppBar from "./AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {changeCheckboxTaskAC, changeTitleTaskAC, createTaskAC, deleteTaskAC} from "./state/TasksReducer";
import {
    changeTitleTodolistAC,
    createTodolistAC, deleteTodolistAC,
    filterTodolistAC
} from "./state/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateStoreType} from "./state/store";

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

    const dispatch = useDispatch()

    const tasks = useSelector<StateStoreType,StateTaskType>(
        state => state.tasks)

    const todolists = useSelector<StateStoreType,StateTodolistType[]>(
        state => state.todolists)



    const filterTodolist = (idTodolist: string, valueFilter: FilterType) => {
        dispatch(filterTodolistAC(idTodolist, valueFilter))
    }

    const deleteTodolist = (idTodolist: string) => {
        dispatch(deleteTodolistAC(idTodolist))
    }


    const changeTitleTodolist = (idTodolist: string, editTitle: string) => {
        dispatch(changeTitleTodolistAC(idTodolist, editTitle))
    }

    const createTodolist = (text: string) => {
        dispatch(createTodolistAC(text))
    }


    const changeTitleTask = (idTodolist: string, idTask: string, editTitle: string) => {
        dispatch(changeTitleTaskAC(idTodolist, idTask, editTitle))
    }


    const createTask = (idTodolist: string, text: string) => {
        dispatch(createTaskAC(idTodolist, text))
    }

    const changeCheckboxTask = (idTodolist: string, idTask: string, valueCheckbox: boolean) => {
        dispatch(changeCheckboxTaskAC(idTodolist, idTask, valueCheckbox))
    }

    const deleteTask = (idTodolist: string, idTask: string) => {
        dispatch(deleteTaskAC(idTodolist, idTask))
    }


    return (
        <div>

            <PrimarySearchAppBar/>
            <Container>
                <Grid container style={{padding: '20px'}}>
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

                            return <Grid item key={todol.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        changeTitleTask={changeTitleTask}
                                        changeTitleTodolist={changeTitleTodolist}
                                        deleteTodolist={deleteTodolist}
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
