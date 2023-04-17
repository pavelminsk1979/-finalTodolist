import React from 'react';
import PrimarySearchAppBar from "./AppBar";
import {RootTodolist} from "./RootTodolist";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Login";


function App() {
    return (
        <div>
            <PrimarySearchAppBar/>

            <Routes>
                <Route path='/' element={<RootTodolist/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='*' element={<Navigate to = '/404'/>}/>
                <Route path='404' element={<h3>404:PAGE NOT FOUND</h3>}/>
            </Routes>

        </div>
    );
}

export default App;
