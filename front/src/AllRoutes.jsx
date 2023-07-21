import React,{ useState,useEffect } from 'react';
import { BrowserRouter, Route , Routes, useNavigate } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import LoginGoogle from './pages/LoginGoogle';
import Check from './pages/Check';
import axios from 'axios';





const AllRoutes = () => {

    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const AuthUrl = process.env.REACT_APP_API_HOST+`api/auth`
    const navigate = useNavigate()

    const checkAuthentication = async()=>{
            
        try{
            
            const response = await axios.get(AuthUrl,{withCredentials:true})
          
            
           
            
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
    },[])
    
  
    return (
        
        <Routes>
          
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<LoginGoogle/>} />
            
          {isAuthenticated ? (
            <>
              <Route path="/:project_id/check/:casting_id" element={<Check />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/AddProject" element={<NewProject />} />
              <Route path="/Dashboard/:project_id" element={<Dashboard />} />
              <Route path="/test1" element={<Order />} />
              <Route path="/:project_id/order/:casting_id" element={<Order />} />
             
            </>
          ) : 
          null}
        </Routes>
      
            

    );
};

export default AllRoutes;