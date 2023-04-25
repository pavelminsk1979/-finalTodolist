import React, {useCallback} from "react";
import {CreateItemForm} from "./CreateItemForm";
import {EditModeTitle} from "./EditModeTitle";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteForever from "@mui/icons-material/DeleteForever";
import {Task} from "./Task";
import {CommonTodolistType, FilterType, TaskStatus} from "../common/types";
import { StateTaskType} from "../state/TasksReducer";

type TodolistType = {
    filter: FilterType
    title: string
    deleteTask: (idTodolist: string, idTask: string) => void
    changeTitleTodolist: (idTodolist: string, editTitle: string) => void
    changeTitleTask: (idTodolist: string, idTask: string, editTitle: string) => void
    deleteTodolist: (idTodolist: string) => void
    changeCheckboxTask: (idTodolist: string, idTask: string, valueCheckbox: boolean) => void
    filterTodolist: (idTodolist: string, valueFilter: FilterType) => void
    createTask: (idTodolist: string, text: string) => void
    todolist: CommonTodolistType
    tasks: StateTaskType
    disableValue: boolean
}

export const Todolist = ({
                             title,
                             tasks,
                             deleteTask,
                             filterTodolist,
                             createTask,
                             changeCheckboxTask,
                             filter,
                             todolist, deleteTodolist, changeTitleTodolist, changeTitleTask, disableValue
                         }: TodolistType) => {


    const changeCheckboxTaskHundler = (idTask: string, valueCheckbox: boolean) => {
        changeCheckboxTask(todolist.id, idTask, valueCheckbox)
    }

    const createTaskHundler = useCallback((text: string) => {
        createTask(todolist.id, text)
    }, [])

    const deleteTaskHandler = (idTask: string) => {
        deleteTask(todolist.id, idTask)
    }

    const onClickFiltrTodolist = (valueFilter: FilterType) => {
        filterTodolist(todolist.id, valueFilter)
    }

    const deleteTodolistHundler = () => {
        deleteTodolist(todolist.id)
    }

    const changeTitleTodolistHundler = (editTitle: string) => {
        changeTitleTodolist(todolist.id, editTitle)
    }

    const changeTitleTaskHundler = (idTask: string, editTitle: string) => {
        changeTitleTask(todolist.id, idTask, editTitle)
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
                                callbackDel={deleteTaskHandler}
                                callbackChangeTitle={changeTitleTaskHundler}
                                callbackCheckbox={changeCheckboxTaskHundler}
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
                    onClick={() => onClickFiltrTodolist('all')}>All
                </Button>
                <Button
                    color={'secondary'}
                    size={filter === 'new' ? 'medium' : 'small'}
                    variant={filter === 'new' ? "contained" : 'outlined'}
                    onClick={() => onClickFiltrTodolist('new')}>New
                </Button>
                <Button
                    color={'secondary'}
                    size={filter === 'completed' ? 'medium' : 'small'}
                    variant={filter === 'completed' ? "contained" : 'outlined'}
                    onClick={() => onClickFiltrTodolist('completed')}>Completed
                </Button>
            </div>

        </div>
    )
}