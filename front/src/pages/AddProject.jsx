import {useState, React} from 'react';
import Step1 from '../composants/Step1';
import Step2 from '../composants/Step2';
import Step3 from '../composants/Step3';
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";



const AddProject = () => {
    
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const steps = ['1', '2', '3'];
    const [errorMessage, SetErrorMessage]= useState('')
    const [isStep1Valid, setStep1Valid] = useState(false); 
    const [step1, setStep1] = useState('')
    const [step2, setStep2] = useState('')
    const [step3, setStep3] = useState([])
    console.log(isStep1Valid)
    console.log(currentStep)
    

    const handleStep1Next = (data) => {
        // Traitez les données de l'étape 1 ici
        setStep1(data);
    
        // Mettez à jour l'état de validation de l'étape 1
        setStep1Valid(true);
      };

      const handleStep2Next = (data)=>{
        setStep2(data)
      }

    //switch into different step
    const nextStep = () => {
        if (currentStep === 1 && step1.trim() === '') {
            SetErrorMessage('Veuillez remplir tous les champs')
            // Vérification de la validation de l'étape 1 avant de passer à l'étape suivante
            
          }else{
            setCurrentStep(currentStep + 1);
            setProgress((currentStep + 1) * (100 / steps.length));

          }
      
      };

      const prevStep = () => {
        SetErrorMessage('')
        if(currentStep > 1){
            setCurrentStep(currentStep - 1);

        }
            
        
        
      };

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
                 {(currentStep === 1 || currentStep === 0)  && <Step1 onNext={handleStep1Next} ErrorMessage={errorMessage}/>}
                 {currentStep === 2 && <Step2 />}
                 {currentStep === 3 && <Step3 />}

            
            </div>

           
        </div>
     

            
            
        </div>
    );
};

export default AddProject;