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


    return (
        <div className='projects'>
            <Navbar></Navbar>
            <div className='project-content-header'>
                <div className='project-content-header-left' onClick={()=>Navigate('/AddProject')}>
                    <h3>Create a new project</h3>
                    <MdAdd></MdAdd>

                </div>
                <div className='project-content-header-right' >
                    <div className='search-box'>
                        <button className='btn-search'><FontAwesomeIcon icon={faMagnifyingGlass} /></button> 
                        <input type="search" placeholder='Search by name ...' className='input-search' />

                    </div>
                   
                    <div className='filterProject'>
                        <h3>Filter</h3>
                        <FaFilter></FaFilter>
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