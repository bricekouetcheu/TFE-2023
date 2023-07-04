import React from 'react';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import Ifcviewer from './composants/ifcviewer';
import Dashboard from './pages/Dashboard';
import Test from './composants/Test';
import Order from './pages/Order';
import Exemple from './composants/Exemple';


const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<Register/>} path = '/register'/>
                <Route element = {< Login/>} path = '/'/>
                <Route element = {<Projects/>} path = '/projects'/>
                <Route element = {<NewProject/>} path = '/AddProject'/>
                <Route element = {<Dashboard/>} path = '/Dashboard/:project_id'/>
                <Route element = {<Exemple />} path = '/test'/>
                <Route element = {<Order />} path = '/test1'/>    
                <Route element = {<Order />} path = '/order/:casting_id'/>   
            </Routes>
        </BrowserRouter>
            

    );
};

export default AllRoutes;