import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GiConcreteBag } from "react-icons/gi";
import { MdProductionQuantityLimits} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';





const CastingModal = (props) => {

    const [casting , setCasting] = useState()
    const {project_id} = useParams()
    const getOnCastingUrl = process.env.REACT_APP_HOST+`api/projects/${project_id}/casting/${props.castingId}`
    const Navigate = useNavigate()
    
    const handleCloseModal = () => {
        props.onCloseModal();
      };

      useEffect(() => {
        const fetchCastingData = async () => {
          try {
            const response = await axios.get(getOnCastingUrl); 
            const data = response.data;
            setCasting(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchCastingData();
      }, [props.castingId]);

      const switchPage = ()=>{
        Navigate(`/order/${props.castingId}`)
      }

   
    return (
        <div className='casting-modal'>
            <div className='casting-modal-card'>
            {casting && casting[0].casting_description && (
                <>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={handleCloseModal} className='casting-close-btn' color='#fff' />
                    <h4>Casting informations</h4>
                
                    
                    <div className='casting-description'>
                        <h4><FontAwesomeIcon icon={faCircleInfo} /> Description</h4>
                        <p> {casting[0].casting_description}</p>
                    </div>
                    <div className='casting-volume'>
                        <h4> <GiConcreteBag></GiConcreteBag> Volume</h4>
                        <p>{casting[0].casting_volume_beton}</p>
                    </div>

                     <button className='casting-order' onClick={switchPage}> <MdProductionQuantityLimits></MdProductionQuantityLimits> Order concrete </button>
                </>
                    

                    )}

            </div>
  
                
        </div>
    );
};

export default CastingModal;