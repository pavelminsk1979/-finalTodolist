import React, {useCallback, useEffect} from 'react';
import {Todolist} from "features/todolist/Todolist";
import {CreateItemForm} from "./CreateItemForm";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {todolistThunk} from "features/todolist/TodolistReducer";
import {useSelector} from "react-redux";
import { useAppDispatch} from "features/app/store";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "./ErrorSnackBar";
import {Navigate} from "react-router-dom";
import {selectStatusLoading} from "features/app/appSelectors";
import {selectIsIsLoggedIn} from "features/auth/authSelectors";
import {selectTasks} from "features/task/taskSelectors";
import {selectTodolists} from "features/todolist/todolistsSelectors";



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
        dispatch(todolistThunk.setTodolists())
    }, [])


    const createTodolist = useCallback((text: string) => {
        dispatch(todolistThunk.createTodolist({text}))
    }, [])


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
                                        filter={todol.filter}
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



