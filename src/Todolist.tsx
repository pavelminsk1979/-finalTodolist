import React from "react";
import {FilterType, TaskType} from "./App";

type TodolistType = {
    title: string
    filterTasks: TaskType[]
    deleteTask:(idTask:number)=>void
    filterTodolist:(valueFilter:FilterType)=>void
}

export const Todolist = ({title,filterTasks,deleteTask,filterTodolist}: TodolistType) => {

    const onClickDeleteHundler = (idTask:number) => {
        deleteTask(idTask)
    }

    const onClickFiltrHundler = (valueFilter:FilterType) => {
        filterTodolist(valueFilter)
    }

    return (
        <div>

            <h3>{title}</h3>
            <div>
                <input/>
                <button>CREATE</button>
            </div>
            <ul>
                {
                    filterTasks.map(e => {
                        return (
                            <li key={e.id}>
                                <input
                                    type="checkbox"
                                    checked={e.isDone}/>
                                <span>{e.title}</span>
                                <button onClick={()=>onClickDeleteHundler(e.id)}>DELETE</button>

                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>onClickFiltrHundler('all')}>All</button>
                <button onClick={()=>onClickFiltrHundler('new')}>New</button>
                <button onClick={()=>onClickFiltrHundler('completed')}>Completed</button>
            </div>

        </div>
    )
}