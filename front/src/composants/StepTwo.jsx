import React, { useState } from 'react';
import validator from 'validator';



const StepTwo = (values, onNext, onPrev,handleFormData ) => {

    const [ErrorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(validator.isEmpty(values.street) || validator.isEmpty(values.number) || validator.isEmpty(values.city) || validator.isEmpty(values.postalcode)){
            setErrorMessage('Please fill in all fields' )
        }
    }

    return (
        <div className='step2'>
        <h2>Project Location</h2>
        <div className='step2-form'>
            <div className='step2-form-top'>
                <div className='street'>
                    <label htmlFor="street">street </label>
                    <input type="text" id='1'  placeholder='Rue des marais' />
                </div>
                <div className='number'>
                    <label htmlFor="number"> number</label>
                    <input type="text" className='number' placeholder='50' />
                </div>
            </div>
            <div className='step2-form-bottom'>
                <div className='city'>
                    <label htmlFor="city"> city </label>
                    <input type="text" placeholder='bruxelles' />
                </div>
                <div className='code'>
                    <label htmlFor="postalCode"> postal code</label>
                    <input type="text"  placeholder='1080' />
                </div>

            </div>
            
        </div>

        <div className='step2-navigation'>
                <button>Previous</button>
                <button>Home</button>
                <button>Next</button>

            </div>

       
        
      </div>
    );
};

export default StepTwo;