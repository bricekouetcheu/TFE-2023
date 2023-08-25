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
import Rgpd from './pages/Rgpd';
import axios from 'axios';





const AllRoutes = () => {

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const AuthUrl = process.env.REACT_APP_API_HOST+`api/auth`;
    const navigate = useNavigate();

        /**
     * Vérifie l'authentification de l'utilisateur en effectuant une requête GET vers l'URL d'authentification.
     *
     * @async
     * @function
     * @name checkAuthentication
     * @returns {void}
     */

    const checkAuthentication = async()=>{
        try{
            const response = await axios.get(AuthUrl,{withCredentials:true})
            
            if(response.data === "authentifié"){   
                setIsAuthenticated(true)
            }else{
                navigate('/login')
                setIsAuthenticated(false) 
            }
           
        }catch(err){
            console.log(err)
            setIsAuthenticated(false);
            navigate('/login')
        }
    }


    useEffect(()=>{

        setTimeout(()=>{
            checkAuthentication() 
        } , 1000)
      
       
    },[isAuthenticated])



  
    
  
    return (
        
        <Routes>
            <Route path="/rgpd" element={<Rgpd/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginGoogle/>} />
            <Route path="/" element={<Projects />} />
            
           
            
          {isAuthenticated ? (
            <>
             
              <Route path="/:project_id/check/:casting_id" element={<Check />} />
              
              
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