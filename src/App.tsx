import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all'|'new'|'completed'


function App() {
    const [tasks,setTasks] = useState( [
        {id: v1(), title: 'REACT', isDone: true},
        {id: v1(), title: 'ANGULAR', isDone: false},
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'English', isDone: false},
    ])

    const [filter,setFilter]=useState<FilterType>('all')

    const createTask = (text:string) => {
        setTasks([{id: v1(), title:text , isDone: true},...tasks])
    }


    const deleteTask = (idTask:string) => {
        setTasks(tasks.filter(el=>el.id!==idTask))
    }

    const filterTodolist = (valueFilter:FilterType) => {
        setFilter(valueFilter)
    }

    let filterTasks = tasks
    if(filter==='new'){
        filterTasks=filterTasks.filter(task=>!task.isDone)
    } else if(filter==='completed'){
        filterTasks=filterTasks.filter(task=>task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                createTask={createTask}
                filterTodolist={filterTodolist}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
                title={'What to learn'}/>
        </div>
    );
}

export default App;
