import React, {useEffect} from 'react';
import PrimarySearchAppBar from "./AppBar";
import {RootTodolist} from "./RootTodolist";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Login";
import {StateStoreType, useAppDispatch} from "../state/store";
import {initializeAppTC} from "../state/appReducer";
import {useSelector} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";


function App() {

    const dispatch = useAppDispatch()

    const isInitialized = useSelector<StateStoreType,boolean>(
        state => state.app.isInitialized
    )

    useEffect(() => {
        dispatch(initializeAppTC())
    })

    if(!isInitialized){
        return <div style={{
            position:'fixed',top:'30%',textAlign:'center',width:'100%'}}>
            <CircularProgress />
        </div>

    }

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
