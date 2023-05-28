import React from 'react';
import Maps from '../composants/Maps';
import Navbar from '../composants/Navbar';

const Projects = () => {
    return (
        <div className='projects'>
            <Navbar></Navbar>
            <h1>Mes project</h1>
            <div className='projects-maps'>
            

            
                
                <Maps></Maps>
            </div>

           

        
            </div>

    );
};

export default Projects;