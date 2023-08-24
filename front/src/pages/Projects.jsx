import React, { useEffect, useState} from 'react';
import Maps from '../composants/Maps';
import Navbar from '../composants/Navbar';
import { MdAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';





const Projects = () => {
    

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const AuthUrl = process.env.REACT_APP_API_HOST+`api/auth`;
    const navigate = useNavigate();


    const checkAuthentication = async()=>{
  
        try{
            const response = await axios.get(AuthUrl,{withCredentials:true})
            
            if(response.data === "authentifié"){
    
                
                setIsAuthenticated(true)
            }else{
                
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
            checkAuthentication();
        }, 1000)
        
    },[])
 // Utilisez un opérateur ternaire pour conditionner le rendu
 return (
    isAuthenticated ? (
        <>
            <div className='projects'>
                <Navbar currentPage='home' />
                <div data-testid='btn-home' className='projects-maps'>
                    <Maps />
                </div>
            </div>
        </>
    ) : null // Rendu vide si l'utilisateur n'est pas authentifié
);
};

export default Projects;