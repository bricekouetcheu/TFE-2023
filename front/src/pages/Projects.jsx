import React, { useEffect } from 'react';
import Maps from '../composants/Maps';
import Navbar from '../composants/Navbar';
import { MdAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const Projects = () => {
    const Navigate = useNavigate()
    const APIkey = 'AIzaSyC8M7uA-l0SqfoQfF1A2iAAujYZZ5pEEDU'
    const getProjectUrl = 'http://localhost:4000/api/projects'

    useEffect(()=>{

        axios.get('http://localhost:4000/api/projects')
        .then(result=>{
            const data = result.data
            console.log(data)

        }).catch(err=>
            console.log(err)
        )




    },[])

    return (
        <div className='projects'>
            <Navbar></Navbar>
            <div className='project-content-header'>
                <div className='project-content-header-left' onClick={()=>Navigate('/AddProject')}>
                    <h3>Create a new project</h3>
                    <MdAdd></MdAdd>

                </div>
                <div className='project-content-header-right' >
                    <input type="search" />
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