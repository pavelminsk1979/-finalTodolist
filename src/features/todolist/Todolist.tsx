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


type TodolistType = {
    filter: FilterType
    title: string
    changeTitleTodolist: (idTodolist: string, editTitle: string) => void
    deleteTodolist: (idTodolist: string) => void
    filterTodolist: (idTodolist: string, valueFilter: FilterType) => void
    todolist: CommonTodolistType
    tasks: StateTaskType
    disableValue: boolean
}

export const Todolist = ({
                             title,
                             tasks,
                             filterTodolist,
                             filter,
                             todolist, deleteTodolist, changeTitleTodolist, disableValue
                         }: TodolistType) => {

    const dispatch = useAppDispatch()


    const createTaskHundler = useCallback((text: string) => {
        dispatch(taskThunks.createTask({idTodolist:todolist.id, text}))
    }, [])


    const onClickFiltrTodolist = (valueFilter: FilterType) => {
        filterTodolist(todolist.id, valueFilter)
    }

    const deleteTodolistHundler = () => {
        deleteTodolist(todolist.id)
    }

    const changeTitleTodolistHundler = (editTitle: string) => {
        changeTitleTodolist(todolist.id, editTitle)
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

















