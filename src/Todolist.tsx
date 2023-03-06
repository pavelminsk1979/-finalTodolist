import React from "react";
import {FilterType, TaskType} from "./App";
import stule from "./Todolist.module.css";
import {CreateItemForm} from "./CreateItemForm";
import {EditModeTitle} from "./EditModeTitle";

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

                <button
                    onClick={deleteTodolistHundler}
                >DELETE
                </button>
            </h3>

            <CreateItemForm
                name={'CREATE'}
                callback={createTaskHundler}/>

            <ul>
                {
                    filterTasks.map(e => {
                        return (
                            <li className={e.isDone ? stule.completeTask : ''}
                                key={e.id}>
                                <input
                                    onChange={(event) => changeCheckboxTaskHundler(
                                        e.id, event.currentTarget.checked
                                    )}
                                    type="checkbox"
                                    checked={e.isDone}/>
                                <EditModeTitle
                                    callback={(editTitle: string) => changeTitleTaskHundler(
                                        e.id, editTitle)}
                                    title={e.title}/>

                                <button onClick={() => onClickDeleteTask(e.id)}>DELETE</button>

                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button
                    className={filter === 'all' ? stule.buttonFiltr : ''}
                    onClick={() => onClickFiltrTodolist('all')}>All
                </button>
                <button
                    className={filter === 'new' ? stule.buttonFiltr : ''}
                    onClick={() => onClickFiltrTodolist('new')}>New
                </button>
                <button
                    className={filter === 'completed' ? stule.buttonFiltr : ''}
                    onClick={() => onClickFiltrTodolist('completed')}>Completed
                </button>
            </div>

        </div>
    )
}