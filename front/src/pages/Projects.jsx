import React, { useEffect } from 'react';
import Maps from '../composants/Maps';
import Navbar from '../composants/Navbar';
import { MdAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';





const Projects = () => {
    const Navigate = useNavigate()

    useEffect(()=>{
        console.log('hellooo')
    },[])


    return (
        <div className='projects'>
            <Navbar currentPage='home'></Navbar>
            <h2>Mes Projets</h2>
            <div className='project-content-header'>
               
                <div className='project-content-header-left' onClick={()=>Navigate('/AddProject')}>
                  

                </div>
                <div className='project-content-header-right' >
                    <div className='search-box'>
                        <button className='btn-search'><FontAwesomeIcon icon={faMagnifyingGlass} /></button> 
                        <input type="search" placeholder='Rechercher projet...' className='input-search' />

                    </div>
                   
                    <div className='create-projet' onClick={()=>Navigate('/AddProject')}>
                         <h3>Ajouter Nouveau Projet</h3>
                        <MdAdd className='create-projet-icon'></MdAdd>
                   </div>
                </div>
               
            </div>
            <div className='projects-maps'>
            

            
                
                <Maps></Maps>
            </div>

           

        
            </div>

    );
};

export default Projects;