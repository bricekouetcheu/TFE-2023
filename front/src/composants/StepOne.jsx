import {useState,React} from 'react';
import validator from 'validator';

const StepOne = ({onNext, handleFormData, values}) => {
    const [errorMessage, setErrorMessage] = useState('')

    const handleProjectName = (e) =>{
        e.preventDefault();

        if(validator.isEmpty(values.projectName)){
            setErrorMessage('Enter the project Name')


        }else{
           onNext();
          
        }
    }


    return (
        <div className='step1'>
            <h1>Project Name </h1>
            <input placeholder='Enter project name'defaultValue={values.projectName} name='projectName' onChange={handleFormData('projectName')}/>
            <p>{errorMessage}</p>
            <button className='btn-step1' onClick={handleProjectName}>next</button>
            
        </div>
    );
};

export default StepOne;