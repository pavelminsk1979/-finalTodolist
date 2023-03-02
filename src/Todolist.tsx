import React, {useState} from "react";
import {FilterType, TaskType} from "./App";
import stule from "./Todolist.module.css";
import {Button} from "./Button";
import {Input} from "./Input";
import {Checkbox} from "./Checkbox";

type TodolistType = {
    filter: FilterType
    title: string
    filterTasks: TaskType[]
    deleteTask: (idTask: string) => void
    changeCheckboxTask: (idTask: string, valueCheckbox: boolean) => void
    filterTodolist: (valueFilter: FilterType) => void
    createTask: (text: string) => void
}

export const Todolist = ({
                             title,
                             filterTasks,
                             deleteTask,
                             filterTodolist,
                             createTask,
                             changeCheckboxTask,
                             filter
                         }: TodolistType) => {

    const [text, setText] = useState('')
    const [inputError, setInputError] = useState<string | null>(null)


    const onClickCreateTask = () => {
        if (text.trim() !== '') {
            createTask(text.trim())
            setText('')
        } else {
            setInputError('Text reguared')
        }

    }

    const onClickDeleteTask = (idTask: string) => {
        deleteTask(idTask)
    }

    const onClickFiltrTodolist = (valueFilter: FilterType) => {
        filterTodolist(valueFilter)
    }

    return (
        <div>

            <h3>{title}</h3>
            <div>

                <Input
                    setInputError={setInputError}
                    inputError={inputError}
                    callback={onClickCreateTask}
                    setText={setText}
                    text={text}/>

                <Button
                    name={'CREATE'}
                    callback={onClickCreateTask}/>
            </div>
            {inputError ? <div className={stule.messageError}>{inputError}</div> : <br/>}
            <ul>
                {
                    filterTasks.map(e => {
                        return (
                            <li className={e.isDone ? stule.completeTask : ''}
                                key={e.id}>

                                <Checkbox
                                    valueChecked={e.isDone}
                                    callback={(valueCheckbox) => changeCheckboxTask(e.id, valueCheckbox)}/>

                                <span>{e.title}</span>

                                <Button
                                    name={'DELETE'}
                                    callback={() => onClickDeleteTask(e.id)}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    name={'All'}
                    callback={() => onClickFiltrTodolist('all')}
                    className={filter === 'all' ? stule.buttonFiltr : ''}/>

                <Button
                    name={'New'}
                    callback={() => onClickFiltrTodolist('new')}
                    className={filter === 'new' ? stule.buttonFiltr : ''}/>

                <Button
                    name={'Complete'}
                    callback={() => onClickFiltrTodolist('completed')}
                    className={filter === 'completed' ? stule.buttonFiltr : ''}/>
            </div>

        </div>
    )
}