import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasks = [
        {id: 1, title: 'REACT', isDone: true},
        {id: 2, title: 'ANGULAR', isDone: false},
        {id: 3, title: 'HTML&CSS', isDone: true},
        {id: 4, title: 'English', isDone: false},
    ]
    return (
        <div className="App">
            <Todolist
                tasks={tasks}
                title={'What to learn'}/>
        </div>
    );
}

export default App;
