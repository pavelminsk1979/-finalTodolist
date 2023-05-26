import React, {useCallback} from "react";
import {CreateItemForm} from "Components/CreateItemForm";
import {EditModeTitle} from "Components/EditModeTitle";
import IconButton from '@mui/material/IconButton';
import DeleteForever from "@mui/icons-material/DeleteForever";
import {Task} from "../task/Task";
import {CommonTodolistType, TaskStatus} from "common/types";
import {StateTaskType, taskThunks} from "../task/TasksReducer";
import {useAppDispatch} from "features/app/store";
import { todolistThunk} from "features/todolist/TodolistReducer";
import {FilterTaskButton} from "features/todolist/filterTaskButton/FilterTaskButton";


type PropsType = {
    todolist: CommonTodolistType
    tasks: StateTaskType
}

export const Todolist = ({tasks, todolist}: PropsType) => {

    const dispatch = useAppDispatch()


    const createTaskHundler = useCallback((text: string) => {
        dispatch(taskThunks.createTask({idTodolist: todolist.id, text}))
    }, [])


    const deleteTodolistHundler = () => {
        dispatch(todolistThunk.deleteTodolist({idTodolist: todolist.id}))
    }

    const changeTitleTodolistHundler = (editTitle: string) => {
        dispatch(todolistThunk.changeTitleTodolist({
            idTodolist: todolist.id,
            editTitle
        }))
    }

    let filterTasks = tasks[todolist.id]
    if (todolist.filter === 'new') {
        filterTasks = filterTasks.filter(
            task => task.status === TaskStatus.New)
    } else if (todolist.filter === 'completed') {
        filterTasks = filterTasks.filter(
            task => task.status === TaskStatus.Complete)
    }


    return (
        <div>
            <h3>
                <EditModeTitle
                    callback={changeTitleTodolistHundler}
                    title={todolist.title}/>

                <IconButton
                    disabled={todolist.disableStatus}
                    onClick={deleteTodolistHundler}>
                    <DeleteForever/>
                </IconButton>

            </h3>

            <CreateItemForm
                disableValue={todolist.disableStatus}
                name={'Task'}
                callback={createTaskHundler}/>

            <div>
                {
                    filterTasks.map(aloneTask => {
                        return (
                            <Task
                                idTodolist={todolist.id}
                                task={aloneTask}
                                key={aloneTask.id}/>
                        )
                    })
                }
            </div>
            <FilterTaskButton todolist={todolist}/>
        </div>
    )
}

















