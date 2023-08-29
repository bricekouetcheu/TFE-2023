/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import CastingModal from './CastingModal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ModifyObject } from '../pages/utils';
import {getConcreteStrengthValue} from './utils'
import PredictionModal from './PredictionModal';

const Cards = (props , {getPrediction}) => {

    const Navigate = useNavigate()
    const {project_id} = useParams()
    
  
 
  
   
  
    /**
     * handle modal status.
     *
     * @function
     * @name handleOpenPrevisionModal
     * @returns {void}
     */
    const handleOpenPrevisionModal = () => {
        props.onOpenPredictionModal(props.id);
    };




    



    /**
     * handle modal status.
     *
     * @function
     * @name handleOpenModal
     * @returns {void}
     */
    const handleOpenModal = () => {
        props.onOpenModal(props.id);
    };




    /**
     * display component based on "props.status_name".
     *
     * @function
     * @name renderContent
     * @param {Function} OpenModal - function handling modal opening/closing.
     * @returns {JSX.Element|null} - JSX to rend based on status name.
     */
      const renderContent = (OpenModal)=>{
        switch(props.status_name){
            case "created":
                return (
                    <>
                        <div onClick={OpenModal } >Ouvrir <FontAwesomeIcon icon={faArrowRight} className='card-icon'  /></div>
                        <div id ='delete-icon-card'> Supprimer <FontAwesomeIcon icon={faTrash}  className='card-icon' /></div>
                    </>
                )
               
            case "ordered":
                return (
                    <>
                  
                        <div onClick={()=>Navigate(`/${project_id}/check/${props.id}`)}  >Check conformite <FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
                    </>

                )
              
            case "delivered":
                return(
                    <>
                   <div onClick={handleOpenPrevisionModal}  >Demarrer la prediction  <FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
                    </>

                )
                
            case "ongoing":
                return (
                    <>
                      <div ><FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
                    </>

                )
                
            case "completed":
                return (
                    <>
                     <div  >DEMARRER  PREDICTION<FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
                    </>

                )
               
            default:
                return null       

        }
      }
    return (
        <div className='casting-card'>
            <h3>{"Casting " + (props.number+1) }</h3>
            <p>{props.description}</p>
            <div className='casting-card-icon'>
                {renderContent(handleOpenModal)}

            </div>
            

            
        </div>
    );
};

export default Cards;