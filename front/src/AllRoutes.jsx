import React from 'react';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import HomeProject from './pages/HomeProject';
import Ifcviewer from './composants/ifcviewer';


const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route element = {<Register/>} path = '/register'/>
                <Route element = {< Ifcviewer />} path = '/'/>
                <Route element = {<Projects/>} path = '/projects'/>
                <Route element = {<NewProject/>} path = '/AddProject'/>
                <Route element = {<HomeProject/>} path = '/HomeProject/:project_id'/>
                

                
            </Routes>
        </BrowserRouter>
            

    );
};

export default AllRoutes;