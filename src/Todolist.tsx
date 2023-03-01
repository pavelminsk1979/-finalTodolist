import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import stule from "./Todolist.module.css";

type TodolistType = {
    filter:FilterType
    title: string
    filterTasks: TaskType[]
    deleteTask:(idTask:string)=>void
    changeCheckboxTask:(idTask:string,valueCheckbox:boolean)=>void
    filterTodolist:(valueFilter:FilterType)=>void
    createTask:(text:string)=>void
}

export const Todolist = ({title,filterTasks,deleteTask,filterTodolist,createTask,changeCheckboxTask,filter}: TodolistType) => {

    const [text,setText]=useState('')
    const [inputError,setInputError]=useState<string|null>(null)

    const changeCheckboxTaskHundler = (idTask:string,valueCheckbox:boolean) => {
        changeCheckboxTask(idTask,valueCheckbox)
    }

    const onChangeCreateText = (event:ChangeEvent<HTMLInputElement>) => {
       if(inputError){setInputError(null)}
        setText(event.currentTarget.value)
    }

    const onClickCreateTask = () => {
        if(text.trim()!==''){
            createTask(text.trim())
            setText('')
        }else {
            setInputError('Text reguared')
        }

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
                    className={inputError?stule.inputError:''}
                    onKeyPress={onKeyPressCreateText}
                    onChange={onChangeCreateText}
                    value={text}/>
                <button
                    onClick={onClickCreateTask}
                >CREATE</button>
            </div>
            {inputError?<div className={stule.messageError}>{inputError}</div>:<br/>}
            <ul>
                {
                    filterTasks.map(e => {
                        return (
                            <li className={e.isDone?stule.completeTask:''}
                                key={e.id}>
                                <input
                                    onChange={(event)=>changeCheckboxTaskHundler(
                                        e.id,event.currentTarget.checked
                                    )}
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
                <button
                    className={filter==='all'?stule.buttonFiltr:''}
                    onClick={()=>onClickFiltrTodolist('all')}>All</button>
                <button
                    className={filter==='new'?stule.buttonFiltr:''}
                    onClick={()=>onClickFiltrTodolist('new')}>New</button>
                <button
                    className={filter==='completed'?stule.buttonFiltr:''}
                    onClick={()=>onClickFiltrTodolist('completed')}>Completed</button>
            </div>

        </div>
    )
}