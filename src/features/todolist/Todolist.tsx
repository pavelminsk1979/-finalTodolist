import React, {useCallback} from "react";
import {CreateItemForm} from "Components/CreateItemForm";
import {EditModeTitle} from "Components/EditModeTitle";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteForever from "@mui/icons-material/DeleteForever";
import {Task} from "../task/Task";
import {CommonTodolistType, FilterType, TaskStatus} from "common/types";
import {StateTaskType, taskThunks} from "../task/TasksReducer";
import {useAppDispatch} from "features/app/store";
import {todolActions, todolistThunk} from "features/todolist/TodolistReducer";


type PropsType = {
    filter: FilterType
    title: string
    todolist: CommonTodolistType
    tasks: StateTaskType
    disableValue: boolean
}

export const Todolist = ({title, tasks, filter, todolist, disableValue}: PropsType) => {

    const dispatch = useAppDispatch()


    const createTaskHundler = useCallback((text: string) => {
        dispatch(taskThunks.createTask({idTodolist: todolist.id, text}))
    }, [])


    const changeTodolistFilter = (valueFilter: FilterType) => {
        dispatch(todolActions.filterTodolist({
            idTodolist: todolist.id,
            valueFilter
        }))
    }

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
                    title={title}/>

                <IconButton
                    disabled={disableValue}
                    onClick={deleteTodolistHundler}>
                    <DeleteForever/>
                </IconButton>

            </h3>

            <CreateItemForm
                disableValue={disableValue}
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
            <div>
                <Button
                    color={'secondary'}
                    size={filter === 'all' ? 'medium' : 'small'}
                    variant={filter === 'all' ? "contained" : 'outlined'}
                    onClick={() => changeTodolistFilter('all')}>All
                </Button>
                <Button
                    color={'secondary'}
                    size={filter === 'new' ? 'medium' : 'small'}
                    variant={filter === 'new' ? "contained" : 'outlined'}
                    onClick={() => changeTodolistFilter('new')}>New
                </Button>
                <Button
                    color={'secondary'}
                    size={filter === 'completed' ? 'medium' : 'small'}
                    variant={filter === 'completed' ? "contained" : 'outlined'}
                    onClick={() => changeTodolistFilter('completed')}>Completed
                </Button>
            </div>

        </div>
    )
}

















