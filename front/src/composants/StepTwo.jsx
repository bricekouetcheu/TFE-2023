/* eslint-disable react/prop-types */
import React, { useState,useEffect } from 'react';
import validator from 'validator';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { faHouse} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const createAddress = (street, number, city, postalCode) => {
    const address = `${street}  ${number}, ${city} ${postalCode}`;
    return address;
  }

 export const normalizeAddress = (address)=>{
    if(address){
        return address.toLowerCase().replace(/\s+/g, ' ') .trim(); 
    }
  
}

  


const StepTwo = ({values, onNext, onPrev,handleFormData}) => {


    const getProjectUrl = process.env.REACT_APP_API_HOST+'api/projects';
    const [addresses, setAddresses] = useState([]);
    const [ErrorMessage, setErrorMessage] = useState('');
    const APIkey = process.env.REACT_APP_API_KEY ;
    const Navigate = useNavigate();

      /**
   * get an address coordonnates.
   *
   * @function
   * @name geocodeAddress
   * @param {string} address - address to get geocoded.
   * @returns {Promise<{lat: number, lng: number}> | null} - A promise with the geographic coordinates (latitude and longitude) of the address, or null if the address could not be geocoded.
   */
      const geocodeAddress = async (address) => {
        
        try {
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${APIkey}`;
            const result = await axios.get(apiUrl);
            const { results } =  result.data;
            if (results.length > 0) {
              const { lat, lng } = results[0].geometry.location;
              return { lat, lng };
            } else {
              return null;
            }
          } catch (err) {
            console.log(err);
            return null;
          }
      
      };


     



  /**
   * Retrieves all projects from the API, converts their addresses to geographic coordinates and updates the list of projects with the obtained coordinates.
   *
   * @function
   * @name getAllProject
   * @param {Function} setProjects - The function to update the list of projects with geographical coordinates.
   * @returns {void}
   */
      const getAllAddress = async ()=>{

        try{
            const result = await axios.get(getProjectUrl, {withCredentials:true});
            const data = result.data
            

            setAddresses(data.map(project=>project.project_address))

        }
        catch(err){
            console.log(err)

        }

       
       
        
      }
     

    const handleSubmit = async(e)=>{
       
        e.preventDefault()
        let newAddress = createAddress(values.street ,values.number,values.city, values.postalcode);
        if(validator.isEmpty(values.street) ||
           validator.isEmpty(values.number) ||
           validator.isEmpty(values.city) ||
           validator.isEmpty(values.postalcode)){

            setErrorMessage('veuillez remplir tous les champs');
          
        } 
        else{
            const addressExists = await geocodeAddress(newAddress);
           
            
            if(addressExists){
                
                const normalizedNewAddress = normalizeAddress(newAddress);
                const normalizedAddresses = addresses.map(address=>normalizeAddress(address))
               
                setErrorMessage('Cette addresse est deja enregistrée');
                if(normalizedAddresses.includes(normalizedNewAddress)){
                    setErrorMessage('Cette adresse est déjà enregistrée');

                } else{
                    onNext();
                    
                }

            }else{
                setErrorMessage('Cette adresse n\'existe pas.');
            }
            
            
        }
       
     
       
    }

    useEffect(()=>{
        getAllAddress()
    },[])

    return (
        <div className='step2'>
        <h2>Localisation</h2>
      
        <div className='step2-form'>
        <h3 className = 'errorMessage'>{ErrorMessage}</h3>
            
            <div className='step2-form-top'>
                <div className='street'>
                    <label htmlFor="street">Rue </label>
                    <input data-testid ='street-input' type="text" id='1' defaultValue={values.street}  placeholder='Rue des marais' name='street' onChange={handleFormData('street')}  />
                </div>
                <div className='number'>
                    <label htmlFor="number"> Numero </label>
                    <input data-testid ='number-input' type="text" className='number' defaultValue={values.number}  placeholder='50' name='number'   onChange={handleFormData('number')} />
                </div>
            </div>
            <div className='step2-form-bottom'>
                <div className='city'>
                    <label htmlFor="city"> Ville </label>
                    <input   data-testid ='city-input' type="text" placeholder='bruxelles' defaultValue={values.city}  name='city'  onChange={handleFormData('city')}  />
                </div>
                <div className='code'>
                    <label htmlFor="postalCode" > Code postal</label>
                    <input data-testid ='postalcode-input' type="text"  placeholder='1080' defaultValue={values.postalcode} name='postalcode' onChange={handleFormData('postalcode')}   />
                </div>

            </div>
            
        </div>

        <div className='step2-navigation'>
                <button onClick={onPrev}><FontAwesomeIcon icon={faChevronLeft} />Precedent</button>
                <button onClick={()=>Navigate('/projects')} data-testid="btn-home">Acceuil <FontAwesomeIcon icon={faHouse} /></button>
                <button onClick={handleSubmit} data-testid="btn-next">Suivant <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></button>

            </div>

       
        
      </div>
    );
};

export default StepTwo;