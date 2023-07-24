import {useState,React, useEffect} from 'react';
import validator from 'validator';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const StepOne = ({onNext, handleFormData, values}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [agendas, setAgenda] = useState()
    const getAgendaUrl =  process.env.REACT_APP_API_HOST+`api/agendas`
    const Navigate = useNavigate()


    const getAllAgendas = async()=>{
        try{
            const response = await axios.get(getAgendaUrl , {withCredentials:true})
            console.log(response.data)

        }catch(err){
            console.log(err)
        }
    }


     /**
     * Handles changing the project name when submitting the form.
     *
     * @function
     * @name handleProjectName
     * @param {Event} e -The project name change event.
     * @returns {void}
     */
    const handleProjectName = (e) =>{
        e.preventDefault();

        if(validator.isEmpty(values.projectName)){
            setErrorMessage('Veuillez entrer le nom du projet')


        }else{
           onNext();
          
        }
    }

    useEffect(()=>{
        getAllAgendas()

    },[])


    return (
        <div className='step1'>
            <h1>Nom du Projet </h1>
            <input placeholder='Enter project name'defaultValue={values.projectName} name='projectName' onChange={handleFormData('projectName')}/>
            <p>{errorMessage}</p>
            <div className='step1-navigation'>
                <button className='btn-step1' onClick={()=>Navigate('/projects')} > Acceuil<FontAwesomeIcon icon={faHouse}/> </button>
                <button className='btn-step1' onClick={handleProjectName}>Suivant <span> </span> <FontAwesomeIcon icon={faChevronRight} /></button>
                

            </div>
            
            
            
        </div>
    );
};

export default StepOne;