import React from "react";
import {TaskType} from "./App";

type TodolistType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = (props: TodolistType) => {
    return (
        <div>

            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>CREATE</button>
            </div>
            <ul>
                {
                    props.tasks.map(e => {
                        return (
                            <li key={e.id}>
                                <input
                                    type="checkbox"
                                    checked={e.isDone}/>
                                <span>{e.title}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>New</button>
                <button>Completed</button>
            </div>

        </div>
    )
}