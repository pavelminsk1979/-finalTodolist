import React, {useEffect} from 'react';
import PrimarySearchAppBar from "../Components/AppBar";
import {RootTodolist} from "Components/RootTodolist";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "Components/Login";
import {useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {selectIsInitialized} from "./appSelectors";
import {appThunk} from "app/appReducer";



function App() {

    const dispatch = useAppDispatch()

    const isInitialized = useSelector(selectIsInitialized)

    useEffect(() => {
        dispatch(appThunk.initializeApp())
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
