import React,{ useState,useEffect } from 'react';
import { BrowserRouter, Route , Routes, useNavigate } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import Exemple from './composants/Exemple';
import Checking from './pages/Checking';
import LoginTest from './pages/LoginTest';
import axios from 'axios';





const AllRoutes = () => {

    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const AuthUrl = process.env.REACT_APP_API_HOST+`api/auth`
    const navigate = useNavigate()

    const checkAuthentication = async()=>{
            
        try{
            
            const response = await axios.get(AuthUrl,{ withCredentials: true })
            
            if(response.data === "authentifié"){
    
                setIsAuthenticated(true)
            }else{
                navigate('/')
                setIsAuthenticated(false) 
                

            }
           
        }catch(err){
            console.log(err)
            setIsAuthenticated(false);
    
        }
    }
    
    useEffect(()=>{
    
    
        checkAuthentication()
        console.log(isAuthenticated);
       
       
    },[]);
    return (
        
        <Routes>

          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LoginTest />} />
  
          {isAuthenticated ? (
            <>
              <Route path="/projects" element={<Projects />} />
              <Route path="/AddProject" element={<NewProject />} />
              <Route path="/Dashboard/:project_id" element={<Dashboard />} />
              <Route path="/test" element={<Exemple />} />
              <Route path="/test1" element={<Order />} />
              <Route path="/order/:casting_id" element={<Order />} />
              <Route path="/checking" element={<Checking />} />
            </>
          ) : null}
        </Routes>
      
            

    );
};

export default AllRoutes;