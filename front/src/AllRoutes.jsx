import React from 'react';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';


const AllRoutes = () => {
    return (
        <div>
        <BrowserRouter>
            <Routes>
                
                <Route element = {<Register/>} path = '/register'/>
                <Route element = {<Login/>} path = '/'/>
                <Route element = {<Projects/>} path = '/projects'/>

                
            </Routes>
        </BrowserRouter>
            
        </div>
    );
};

export default AllRoutes;