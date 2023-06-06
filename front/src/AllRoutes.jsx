import React from 'react';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';


const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route element = {<Register/>} path = '/register'/>
                <Route element = {<Login/>} path = '/'/>
                <Route element = {<Projects/>} path = '/projects'/>
                <Route element = {<NewProject/>} path = '/AddProject'/>

                
            </Routes>
        </BrowserRouter>
            

    );
};

export default AllRoutes;