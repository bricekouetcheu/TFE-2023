import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import CastingModal from './CastingModal';



const Cards = (props) => {


    const handleOpenModal = () => {
        props.onOpenModal(props.id);
      };
    return (
        <div className='casting-card'>
            <h3>{"Casting " + props.id }</h3>
            <p>{props.description}</p>
            <div className='casting-card-icon'>
                <FontAwesomeIcon icon={faEye} className='card-icon' onClick={handleOpenModal} />
                <FontAwesomeIcon icon={faTrash}  className='card-icon' />

            </div>

            
        </div>
    );
};

export default Cards;