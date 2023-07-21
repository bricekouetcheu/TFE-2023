import React,{useEffect, useState} from 'react';
import axios  from 'axios';
import { ModifyObject } from '../pages/utils';
import {getConcreteStrengthValue} from './utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarDays} from  '@fortawesome/free-solid-svg-icons';
import { IoMdClose } from "react-icons/io";

const PredictionModal = (props , {onClose}) => {
    const target = 20;
    const concretePredictionUrl = `http://127.0.0.1:8000/prediction/${target}`
    const [Prediction, setPrediction] = useState()
    const getOneOrderUrl = process.env.REACT_APP_API_HOST+`api/order/${props.casting_id}`
    
  /** 
   * get order information from casting
   * @function
   * @name getOrderfromCasting
   * @returns 
  */
  const getOrderfromCasting = async()=>{
    try{
        const response =  await axios.get(getOneOrderUrl,{withCredentials:true})
        const order = ModifyObject(response.data.order_data)
        const data = {
            "strengthClass": getConcreteStrengthValue(order['classe De Resistance']),
            "cementType": 0.25,
            "temperature_hist": [],
            "time_hist": [],
            "t_cast": 0
        }
        const PredictionResponse = await axios.post(concretePredictionUrl, data)
        console.log(PredictionResponse.data)
        setPrediction(PredictionResponse.data)

    }catch(err){
        console.log(err)
    }

  }
   
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




    useEffect(()=>{
        getOrderfromCasting()
    },[])
    return (
        <div className='prediction-Modal'>
            {Prediction && (
                <>
                
                <div className='prediction-Modal-Content'>
                <IoMdClose onClick={handleCloseModal} className='casting-close-btn'/>
                <div className='prediction-result'>
                    <p>
                        Vous pouvez effectuer votre decoffrage dans 
                    </p>
                    <p id='prediction-days'>
                        {Prediction.uncasting_waiting_time}
                    </p>
                    <p>jours</p>

                </div>

                <div className='prediction-btn'>
                    <button>
                    Ajouter a l'agenda
                    <FontAwesomeIcon icon={faCalendarDays} />

                    </button>
                    
                </div>


            </div>
                </>
           

            )}
            
            
             
            
        </div>
    );
};

export default PredictionModal;