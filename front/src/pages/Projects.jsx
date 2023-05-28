import React from 'react';
import Maps from '../composants/Maps';
import Navbar from '../composants/Navbar';
import { MdAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa"



const Projects = () => {
    return (
        <div className='projects'>
            <Navbar></Navbar>
            <div className='project-content-header'>
                <div className='addNewProject'>
                    <h3>Create a new project</h3>
                    <MdAdd></MdAdd>

                </div>
                <div className='filterProject'>
                    <h3>Filter</h3>
                    <FaFilter></FaFilter>

                </div>
            </div>
            <div className='projects-maps'>
            

            
                
                <Maps></Maps>
            </div>

           

        
            </div>

    );
};

export default Projects;