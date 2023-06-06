import React, { useState } from 'react';
import validator from 'validator';



const StepTwo = ({values, onNext, onPrev,handleFormData}) => {

    const [ErrorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e)=>{
       
        e.preventDefault()

        if(validator.isEmpty(values.street) || validator.isEmpty(values.number) || validator.isEmpty(values.city) || validator.isEmpty(values.postalcode)){
            setErrorMessage('Please fill in all fields' )
            console.log('Oui')
        } else{
            onNext();
            console.log('Non')
        }
    }

    return (
        <div className='step2'>
        <h2>Project Location</h2>
      
        <div className='step2-form'>
        <h3>{ErrorMessage}</h3>
            
            <div className='step2-form-top'>
                <div className='street'>
                    <label htmlFor="street">street </label>
                    <input type="text" id='1' defaultValue={values.street}  placeholder='Rue des marais' name='street' onChange={handleFormData('street')}  />
                </div>
                <div className='number'>
                    <label htmlFor="number"> number</label>
                    <input type="text" className='number' defaultValue={values.number}  placeholder='50' name='number'   onChange={handleFormData('number')} />
                </div>
            </div>
            <div className='step2-form-bottom'>
                <div className='city'>
                    <label htmlFor="city"> city </label>
                    <input type="text" placeholder='bruxelles' defaultValue={values.city}  name='city'  onChange={handleFormData('city')}  />
                </div>
                <div className='code'>
                    <label htmlFor="postalCode"> postal code</label>
                    <input type="text"  placeholder='1080' defaultValue={values.postalcode} name='postalcode' onChange={handleFormData('postalcode')}   />
                </div>

            </div>
            
        </div>

        <div className='step2-navigation'>
                <button onClick={onPrev}>Previous</button>
                <button>Home</button>
                <button onClick={handleSubmit}>Next</button>

            </div>

       
        
      </div>
    );
};

export default StepTwo;