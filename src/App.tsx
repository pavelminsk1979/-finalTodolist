import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterType = 'all'|'new'|'completed'


function App() {
    const [tasks,setTasks] = useState( [
        {id: 1, title: 'REACT', isDone: true},
        {id: 2, title: 'ANGULAR', isDone: false},
        {id: 3, title: 'HTML&CSS', isDone: true},
        {id: 4, title: 'English', isDone: false},
    ])

    const [filter,setFilter]=useState<FilterType>('all')


    const deleteTask = (idTask:number) => {
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
                filterTodolist={filterTodolist}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
                title={'What to learn'}/>
        </div>
    );
}

export default App;
