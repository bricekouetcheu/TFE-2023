import React,{useEffect, useState } from 'react';
import axios  from 'axios';
import { ModifyObject } from '../pages/utils';
import {getConcreteStrengthValue} from './utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarDays} from  '@fortawesome/free-solid-svg-icons';
import { IoMdClose } from "react-icons/io";
import { useParams} from 'react-router-dom'

const PredictionModal = (props , {onClose}) => {

    const openWeatherMapKey = process.env.REACT_APP_WEATHERMAP_KEY
    const {project_id} = useParams()
    const target = 20;
    const concretePredictionUrl = `http://127.0.0.1:8000/prediction/${target}`
    const [Prediction, setPrediction] = useState()
    const getOneOrderUrl = process.env.REACT_APP_API_HOST+`api/order/${props.casting_id}`
    const getOneProjectInformationsUrl = process.env.REACT_APP_API_HOST+`api/project/${project_id}`
    const APIkey = process.env.REACT_APP_API_KEY 
    const [temp_next, setTemp_next] = useState() 
    const [time_next ,setTime_next] = useState() 
    


    const getTemperature = async(lat , long)=>{

        const getTempUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${openWeatherMapKey}`;
        try{
            const response = await axios.get(getTempUrl )

            const forecasts = response.data.list

            const temperaturesByDay = {};
            const timestampsByDay = {};

            // Parcourez les prévisions et groupez les températures par jour
            forecasts.forEach((forecast) => {
              const date = forecast.dt_txt.split(" ")[0];// Obtenez la date au format "AAAA-MM-JJ"
              const timestamp = forecast.dt; 
              const temperatureInKelvin = forecast.main.temp; // Obtenez la température
              const temperatureInCelsius = temperatureInKelvin - 273.15
        
              if (temperaturesByDay[date]) {
                // Si la date existe dans l'objet, ajoutez la température à la liste des températures pour ce jour
                temperaturesByDay[date].push(temperatureInCelsius);
              } else {
                // Si la date n'existe pas dans l'objet, créez une nouvelle liste avec la température
                temperaturesByDay[date] = [temperatureInCelsius];
                timestampsByDay[date] = timestamp;
              }
            });

            const averageTemperatures = [];
            const timestamps = [];
            for (const date in temperaturesByDay) {
              const temperatures = temperaturesByDay[date];
              const totalTemperature = temperatures.reduce((sum, temp) => sum + temp, 0);
              const averageTemperature = totalTemperature / temperatures.length;
              averageTemperatures.push(averageTemperature);
        
              // Ajouter le timestamp correspondant à la date
              timestamps.push(timestampsByDay[date]);
            }
        
            // Vous avez maintenant deux tableaux :
            // averageTemperatures contenant les températures moyennes en degrés Celsius pour chaque jour
            // timestamps contenant les timestamps correspondants aux jours de ces températures
             setTemp_next(averageTemperatures);
             setTime_next(timestamps);

        }catch(err){
            console.log(err)

        }

      

    }
    
  /**
   * get an address coordonnates.
   *
   * @function
   * @name geocodeAddress
   * @param {string} address - address to get geocoded.
   * @returns {Promise<{lat: number, lng: number}> | null} - A promise with the geographic coordinates (latitude and longitude) of the address, or null if the address could not be geocoded.
   */
  const geocodeAddress = async (address) => {
      
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${APIkey}`;
   

    return  axios.get(apiUrl)
      .then(response => {
        const { results } = response.data;
        if (results.length > 0) {
         
          const { lat, lng } = results[0].geometry.location;
          return { lat, lng };
        } else {
          console.log('Adresse introuvable:', address);
          return null;
        }
      })
      .catch(error => {
        console.log('Erreur lors de la requête de géocodage', error);
        return null;
      });
  };

  const getProjectInformations = async()=>{
    try{
        const response  = await axios.get(getOneProjectInformationsUrl , {withCredentials:true})
        const project_address = response.data.project_address
      const coordonnates = await geocodeAddress(project_address)
      getTemperature(coordonnates.lat , coordonnates.lng)

    }catch(err){
        console.log(err)


    }
  }
    
  /** 
   * get order information from casting
   * @function
   * @name getOrderfromCasting
   * @returns 
  */
  const getOrderfromCasting = async()=>{
    try{
        console.log("test1" , temp_next)
        console.log("test2", time_next)
        const response =  await axios.get(getOneOrderUrl,{withCredentials:true})
        const order = ModifyObject(response.data.order_data)
        const data = {
            "strengthClass": getConcreteStrengthValue(order['classe De Resistance']),
            "cementType": 0.25,
            "temperature_hist": temp_next,
            "time_hist": time_next ,
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
        if(temp_next && time_next){
            getOrderfromCasting()

        }
      }, [temp_next, time_next])


    useEffect(()=>{
        
        getProjectInformations()
        
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