import React from "react";
import {FilterType, TaskType} from "./App";
import stule from "./Todolist.module.css";
import {CreateItemForm} from "./CreateItemForm";
import {EditModeTitle} from "./EditModeTitle";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CancelPresentation from "@mui/icons-material/CancelPresentation";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Checkbox from "@mui/material/Checkbox";

type TodolistType = {
    filter: FilterType
    title: string
    filterTasks: TaskType[]
    deleteTask: (idTodolist: string, idTask: string) => void
    changeTitleTodolist: (idTodolist: string, editTitle: string) => void
    changeTitleTask: (idTodolist: string, idTask: string, editTitle: string) => void
    deleteTodolist: (idTodolist: string) => void
    changeCheckboxTask: (idTodolist: string, idTask: string, valueCheckbox: boolean) => void
    filterTodolist: (idTodolist: string, valueFilter: FilterType) => void
    createTask: (idTodolist: string, text: string) => void
    idTodolist: string
}

export const Todolist = ({
                             title,
                             filterTasks,
                             deleteTask,
                             filterTodolist,
                             createTask,
                             changeCheckboxTask,
                             filter,
                             idTodolist, deleteTodolist, changeTitleTodolist, changeTitleTask
                         }: TodolistType) => {


    const changeCheckboxTaskHundler = (idTask: string, valueCheckbox: boolean) => {
        changeCheckboxTask(idTodolist, idTask, valueCheckbox)
    }

    const createTaskHundler = (text: string) => {
        createTask(idTodolist, text)
    }

    const onClickDeleteTask = (idTask: string) => {
        deleteTask(idTodolist, idTask)
    }

    const onClickFiltrTodolist = (valueFilter: FilterType) => {
        filterTodolist(idTodolist, valueFilter)
    }

    const deleteTodolistHundler = () => {
        deleteTodolist(idTodolist)
    }

    const changeTitleTodolistHundler = (editTitle: string) => {
        changeTitleTodolist(idTodolist, editTitle)
    }

    const changeTitleTaskHundler = (idTask: string, editTitle: string) => {
        changeTitleTask(idTodolist, idTask, editTitle)
    }

    return (
        <div>

            <h3>
                <EditModeTitle
                    callback={changeTitleTodolistHundler}
                    title={title}/>

                <IconButton
                    onClick={deleteTodolistHundler}>
                    <DeleteForever/>
                </IconButton>

            </h3>

            <CreateItemForm
                name={'Task'}
                callback={createTaskHundler}/>

            <div>
                {
                    filterTasks.map(e => {
                        return (
                            <div className={e.isDone ? stule.completeTask : ''}
                                key={e.id}>

                                <Checkbox
                                    checked={e.isDone}
                                    onChange={(event) => changeCheckboxTaskHundler(
                                        e.id, event.currentTarget.checked
                                    )}
                                    color="success" />

                                <EditModeTitle
                                    callback={(editTitle: string) => changeTitleTaskHundler(
                                        e.id, editTitle)}
                                    title={e.title}/>

                                <IconButton
                                    size={"small"}
                                    onClick={
                                    () => onClickDeleteTask(e.id)}>
                                    <CancelPresentation/>
                                </IconButton>


                            </div>
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