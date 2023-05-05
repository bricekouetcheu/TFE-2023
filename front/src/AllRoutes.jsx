import React from 'react';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';


const AllRoutes = () => {
    return (
        <div>
        <BrowserRouter>
            <Routes>
                
                <Route element = {<Register/>} path = '/'/>
                <Route element = {<Login/>} path = '/register'/>
                
            </Routes>
        </BrowserRouter>
            
        </div>
    );
};

export default AllRoutes;