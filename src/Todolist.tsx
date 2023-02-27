import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";

type TodolistType = {
    title: string
    filterTasks: TaskType[]
    deleteTask:(idTask:string)=>void
    filterTodolist:(valueFilter:FilterType)=>void
    createTask:(text:string)=>void
}

export const Todolist = ({title,filterTasks,deleteTask,filterTodolist,createTask}: TodolistType) => {

    const [text,setText]=useState('')

    const onChangeCreateText = (event:ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }

    const onClickCreateTask = () => {
        if(text.trim()!==''){
            createTask(text.trim())
        }
        setText('')
    }

    const onKeyPressCreateText = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.key==='Enter'){
          onClickCreateTask()
      }
    }

    const onClickDeleteTask = (idTask:string) => {
        deleteTask(idTask)
    }

    const onClickFiltrTodolist = (valueFilter:FilterType) => {
        filterTodolist(valueFilter)
    }

    return (
        <div>

            <h3>{title}</h3>
            <div>
                <input
                    onKeyPress={onKeyPressCreateText}
                    onChange={onChangeCreateText}
                    value={text}/>
                <button
                    onClick={onClickCreateTask}
                >CREATE</button>
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
                                <button onClick={()=>onClickDeleteTask(e.id)}>DELETE</button>

                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>onClickFiltrTodolist('all')}>All</button>
                <button onClick={()=>onClickFiltrTodolist('new')}>New</button>
                <button onClick={()=>onClickFiltrTodolist('completed')}>Completed</button>
            </div>

        </div>
    )
}