import React,{useEffect, useState } from 'react';
import axios  from 'axios';
import { ModifyObject } from '../pages/utils';
import {getConcreteStrengthValue} from './utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarDays} from  '@fortawesome/free-solid-svg-icons';
import { IoMdClose } from "react-icons/io";
import { useParams} from 'react-router-dom'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const PredictionModal = (props , {onClose}) => {

    const openWeatherMapKey = process.env.REACT_APP_WEATHERMAP_KEY
    const {project_id} = useParams()
    const target = 20;
    const concretePredictionUrl = `http://127.0.0.1:8000/prediction/${target}`
    const createEventUrl = process.env.REACT_APP_API_HOST+`api/event`
    const [Prediction, setPrediction] = useState()
    const getOneOrderUrl = process.env.REACT_APP_API_HOST+`api/order/${props.casting_id}`
    const getOneProjectInformationsUrl = process.env.REACT_APP_API_HOST+`api/project/${project_id}`
    const APIkey = process.env.REACT_APP_API_KEY 
    const [temp_next, setTemp_next] = useState() 
    const [time_next ,setTime_next] = useState() 
    const [project ,setProject] = useState()




       
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




    const createEvent = async()=>{
      
        try{
            const data = {
                agendaId:project.agenda_id,
                timestamp: Prediction.uncasting_timestamp,
                summary : "test",
                description : `Decoffrage beton pour ${project.project_name}`

            }

            await axios.post(createEventUrl, data, { withCredentials:true})
            handleCloseModal()
            
            Swal.fire({
                icon: 'success',
                title: "nouveau casting ajouté à l'agenda",
                showConfirmButton: true,
                confirmButtonColor: '#00BCB6',
                timer: 10000,
                
              });

            
                

            
        
            

        }catch(err){
            console.log(err)

        }
        
    }
    



    /**
     * get next 5 five days temperatures
     * @async
     * @function
     * @param {number} lat 
     * @param {number} long 
     * @returns {Promise<void>} - 
     * @throws {Error} - Une erreur est levée si la requête vers l'API échoue.
     *
     * }
     *    
     */

    const getTemperature = async(lat , long)=>{

        const getTempUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${openWeatherMapKey}`;
        try{
            const response = await axios.get(getTempUrl )

            const forecasts = response.data.list

            const temperaturesByDay = {};
            const timestampsByDay = {};

           
            forecasts.forEach((forecast) => {
              const date = forecast.dt_txt.split(" ")[0];// get Each date
              const timestamp = forecast.dt; 
              const temperatureInKelvin = forecast.main.temp; 
              const temperatureInCelsius = temperatureInKelvin - 273.15
        
              if (temperaturesByDay[date]) {
                
                temperaturesByDay[date].push(temperatureInCelsius);
              } else {
              
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
              timestamps.push(timestampsByDay[date]);
            }
    
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
        setProject(response.data)
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
        setPrediction(PredictionResponse.data)

    }catch(err){
        console.log(err)
    }

  }


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
                    <button onClick={createEvent}>
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