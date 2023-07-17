import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import CastingModal from './CastingModal';
import { useNavigate } from 'react-router-dom';



const Cards = (props) => {

    const Navigate = useNavigate()

    const handleOpenModal = () => {
        props.onOpenModal(props.id);
      };

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
                        <div onClick={()=>Navigate(`/checking/${props.id}`)}  >CHECK CONFORMITE <FontAwesomeIcon icon={faEye} className='card-icon'  /></div>
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