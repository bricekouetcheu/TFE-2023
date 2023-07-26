import {useState,React, useEffect} from 'react';
import validator from 'validator';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import calendar from '../assets/google-calendar.png'



const StepOne = ({onNext, handleFormData, handleSelectData, values}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [agendas, setAgenda] = useState()
    const getAgendaUrl =  process.env.REACT_APP_API_HOST+`api/agendas`
    const Navigate = useNavigate()
    console.log('test1',agendas)
  

    
    const getAllAgendas = async()=>{
        try{
            const response = await axios.get(getAgendaUrl , {withCredentials:true})
           
            const filteredAgenda = response.data.filter((agenda)=> !agenda.primary)
            setAgenda(response.data)

            console.log("test2",response.data)

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

        if(validator.isEmpty(values.projectName) || values.AgendaId === 'Selectionnez un agenda pour ce projet'){
            setErrorMessage('Veuillez remplir tous les champs')

        }
        else{
           onNext();
          
        }
    }

    useEffect(()=>{
        values.AgendaId='Selectionnez un agenda pour ce projet'
        getAllAgendas()

    },[])


    return (
        <div className='step1'>
            {agendas && (
                <>
                
                <h1>Nom du Projet </h1>
                         <input placeholder='Nom du projet'defaultValue={values.projectName} name='projectName' onChange={handleFormData('projectName')} data-testid ='project-name-input'/>
                         {agendas && (
                <select name="AgendaId" id="agenda" className='select-stepOne' onChange={handleSelectData('AgendaId')} data-testid ='agenda-select'>
                    <option>Selectionnez un agenda pour ce projet</option>
                    {agendas.map((agenda,index)=>(
                        <option key= {index} value={agenda.id}>
                            {agenda.summary}
                        </option>
                    ))}
                </select>
            ) }
                     
                         <p>{errorMessage}</p>
                         <div className='step1-navigation'>
                             <button className='btn-step1' onClick={()=>Navigate('/projects')} data-testid="btn-home"> Acceuil<FontAwesomeIcon icon={faHouse}/> </button>
                             <button className='btn-step1' onClick={handleProjectName} data-testid="btn-next">Suivant <span> </span> <FontAwesomeIcon icon={faChevronRight} /></button>
                             
             
                         </div>
                </>
                         

            )}
   
            
            
        </div>
    );
};

export default StepOne;