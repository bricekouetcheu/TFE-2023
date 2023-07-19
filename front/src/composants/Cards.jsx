import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import CastingModal from './CastingModal';
import { useNavigate } from 'react-router-dom';



const Cards = (props) => {

    const Navigate = useNavigate()

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
                        <div onClick={OpenModal } >OUVRIR <FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
                        <div>SUPPRIMER <FontAwesomeIcon icon={faTrash}  className='card-icon' /></div>
                    </>
                )
               
            case "ordered":
                return (
                    <>
                        <div onClick={()=>Navigate(`/check/${props.id}`)}  >CHECK CONFORMITE <FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
                    </>

                )
              
            case "delivered":
                return(
                    <>
                     <div   >DEMARRER PREDICTION<FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
                    </>

                )
                
            case "ongoing":
                return (
                    <>
                      <div  >DEMARRER PREDICTION<FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
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