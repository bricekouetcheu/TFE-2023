import {useState,React} from 'react';
import StepOne from '../composants/StepOne';
import StepTwo from '../composants/StepTwo';
import StepThree  from '../composants/StepThree';

const NewProject = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ['1', '2', '3'];
    const [progress, setProgress] = useState(0);

    const [formData, setFormData]= useState({
        projectName: "",
        street: " ",
        number:" ",
        city:"",
        postalcode: "",
        file:[]
    })

   

    const handleInputData = input => e => {
        // input value from the form
        const {value } = e.target;
    
        //updating for data state taking previous state and then adding new value to create new object
        setFormData(prevState => ({
          ...prevState,
          [input]: value
      }));
      }

    

    //gerer la navigation entre les etapes
    const nextStep = ()=>{
        setCurrentStep(currentStep+1)
    }

    const prevStep = ()=>{
        setCurrentStep(currentStep-1)
    }
    
    

    return (
        <div className='AddProject'>
            
        <div className='AddProject-ul'>
        <h1> Create a New Project</h1>
        <ul className="step-bar">
                {steps.map((step, index) => (
                <li
                     key={index}
                     className={`step-bar-item ${currentStep === index + 1 ? 'active' : currentStep > index + 1 ? 'completed' : ''}`}
                    style={{ width: `${progress}%` }}
                >
                 {step}
                </li>
                 ))}
            </ul>

        </div>

        <div className='AddProject-information'>

            <div className='AddProject-information-step'>
                 {currentStep === 1  && <StepOne onNext={nextStep} handleFormData={handleInputData} values={formData} />}
                 {currentStep === 2 && <StepTwo/>}
                 {currentStep === 3 && <StepThree/>}
               

            
            </div>

         

        </div>
     

            
            
        </div>
    );
};

export default NewProject;