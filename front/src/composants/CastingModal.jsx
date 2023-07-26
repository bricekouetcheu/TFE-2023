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
import { IoMdClose } from "react-icons/io";
import { IoMdCart} from "react-icons/io";









const CastingModal = (props) => {

    const [casting , setCasting] = useState()
    const {project_id} = useParams()
    const getOnCastingUrl = process.env.REACT_APP_API_HOST+`api/projects/${project_id}/casting/${props.castingId}`
    const Navigate = useNavigate()
   
    

  /**
   * handling modal closure.
   *
   * @function
   * @name handleCloseModal
   * @returns {void}
   */
    const handleCloseModal = () => {
        props.onCloseModal();
      };


      /**
   * get casting data.
   *
   * @async
   * @function
   * @name fetchCastingData
   * @returns {Promise<void>} - A promise successfully resolved when casting data is retrieved and updated in the state.
   */
    const fetchCastingData = async () => {
      try {
        const response = await axios.get(getOnCastingUrl , {withCredentials:true} ); 
        const data = response.data;
        setCasting(data);
      } catch (error) {
        console.log(error);
      }
    };


    
    

      useEffect(() => {
    
        fetchCastingData();
      }, [props.castingId]);

      const switchPage = ()=>{
        Navigate(`/${project_id}/order/${props.castingId}`)
      }

   
    return (
        <div className='casting-modal'>
            <div className='casting-modal-card'>
            {casting && (
                <>
                    <IoMdClose onClick={handleCloseModal} className='casting-close-btn' data-testid = 'casting-close-btn'/>
                    
                    <p className='card-title'>Information castings</p>
                
                    
                    <div className='casting-description'>
                        <h4><FontAwesomeIcon icon={faCircleInfo} /> Description</h4>
                        <p> {casting[0].casting_description}</p>
                    </div>
                    <div className='casting-volume'>
                        <h4> <GiConcreteBag></GiConcreteBag> Volume</h4>
                        <p>{casting[0].casting_volume_beton}m³</p>
                    </div>

                     <button className='casting-order' onClick={switchPage}> <IoMdCart></IoMdCart> Commander </button>
                </>
                    

                    )}

            </div>
  
                
        </div>
    );
};

export default CastingModal;