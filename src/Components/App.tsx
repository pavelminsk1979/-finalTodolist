import React from 'react';
import PrimarySearchAppBar from "./AppBar";
import {RootTodolist} from "./RootTodolist";


function App() {
    return (
        <div>
            <PrimarySearchAppBar/>

            <RootTodolist/>
        </div>
    );
}

export default App;
