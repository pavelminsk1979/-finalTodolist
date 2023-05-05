import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {CreateItemForm} from "./CreateItemForm";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    changeCheckboxTaskTC,
    changeTitleTaskTC,
    createTaskTC,
     taskThunks
} from "../state/TasksReducer";
import {
    changeTitleTodolistTC,
    createTodolistTC, deleteTodolistTC,
    setTodolists, todolActions
} from "../state/TodolistReducer";
import {useSelector} from "react-redux";
import { useAppDispatch} from "../state/store";
import { FilterType} from "../common/types";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "./ErrorSnackBar";
import {Navigate} from "react-router-dom";
import {selectStatusLoading} from "../state/appSelectors";
import {selectIsIsLoggedIn} from "../state/authSelectors";
import {selectTasks} from "../state/taskSelectors";
import {selectTodolists} from "../state/todolistsSelectors";


export function RootTodolist() {


    const dispatch = useAppDispatch()

    const tasks = useSelector(selectTasks)

    const todolists = useSelector(selectTodolists)

    const statusLoading = useSelector(selectStatusLoading)

    const isLoggedIn = useSelector(selectIsIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(setTodolists())
    }, [])

    const filterTodolist = (idTodolist: string, valueFilter: FilterType) => {
        dispatch(todolActions.filterTodolist({
            idTodolist: idTodolist,
            valueFilter: valueFilter
        }))
    }

    const deleteTodolist = (idTodolist: string) => {
        dispatch(deleteTodolistTC(idTodolist))
    }


    const changeTitleTodolist = (idTodolist: string, editTitle: string) => {
        dispatch(changeTitleTodolistTC(idTodolist, editTitle))
    }

    const createTodolist = useCallback((text: string) => {
        dispatch(createTodolistTC(text))
    }, [])


    const changeTitleTask = (idTodolist: string, idTask: string, editTitle: string) => {
        dispatch(changeTitleTaskTC(idTodolist, idTask, editTitle))
    }


    const createTask = (idTodolist: string, text: string) => {
        dispatch(createTaskTC(idTodolist, text))
    }

    const changeCheckboxTask = (idTodolist: string, idTask: string, valueCheckbox: boolean) => {
        dispatch(changeCheckboxTaskTC(idTodolist, idTask, valueCheckbox))
    }

    const deleteTask = (idTodolist: string, idTask: string) => {
        dispatch(taskThunks.deleteTask({idTodolist, idTask}))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div>
            {statusLoading === 'loading' && <LinearProgress
                color="secondary"/>}
            <ErrorSnackbar/>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <CreateItemForm
                        name={'Todolist'}
                        callback={createTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todol => {

                            return <Grid item key={todol.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        changeTitleTask={changeTitleTask}
                                        changeTitleTodolist={changeTitleTodolist}
                                        deleteTodolist={deleteTodolist}
                                        filter={todol.filter}
                                        changeCheckboxTask={changeCheckboxTask}
                                        createTask={createTask}
                                        filterTodolist={filterTodolist}
                                        deleteTask={deleteTask}
                                        tasks={tasks}
                                        todolist={todol}
                                        title={todol.title}
                                        disableValue={todol.disableStatus}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

