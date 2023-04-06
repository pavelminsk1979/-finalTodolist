import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {CreateItemForm} from "./CreateItemForm";
import PrimarySearchAppBar from "./AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
     changeCheckboxTaskTC,
     changeTitleTaskTC,
    createTaskTC,
    deleteTaskTC,
    StateTaskType
} from "../state/TasksReducer";
import {
     changeTitleTodolistTC,
    createTodolistTC, deleteTodolistTC,
    filterTodolistAC, setTodolists
} from "../state/TodolistReducer";
import {useSelector} from "react-redux";
import {StateStoreType, useAppDispatch} from "../state/store";
import {CommonTodolistType, FilterType} from "../common/types";
import LinearProgress from "@mui/material/LinearProgress";
import {LoadingType} from "../state/appReducer";
import {ErrorSnackbar} from "./ErrorSnackBar";


function App() {


    const dispatch = useAppDispatch()

    const tasks = useSelector<StateStoreType, StateTaskType>(
        state => state.tasks)

    const todolists = useSelector<StateStoreType, CommonTodolistType[]>(
        state => state.todolists)

    const statusLoading = useSelector<StateStoreType,LoadingType>(
        state => state.app.statusLoading
    )

    useEffect(() => {
        dispatch(setTodolists())
    }, [])

    const filterTodolist = (idTodolist: string, valueFilter: FilterType) => {
        dispatch(filterTodolistAC(idTodolist, valueFilter))
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
        dispatch(deleteTaskTC(idTodolist, idTask))
    }


    return (
        <div>

            <PrimarySearchAppBar/>
            {statusLoading==='loading'&&<LinearProgress
                color="secondary" />}
            <ErrorSnackbar/>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <CreateItemForm name={'Todolist'} callback={createTodolist}/>
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
