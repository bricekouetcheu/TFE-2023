import {useState, React} from 'react';
import { MdLocationPin} from "react-icons/md"
import Step1 from '../composants/Step1';
import Step2 from '../composants/Step2';
import Step3 from '../composants/Step3';
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";



const AddProject = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const steps = ['1', '2', '3'];

    //switch into different step
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
        setProgress((currentStep + 1) * (100 / steps.length));
      };

      const prevStep = () => {
        setCurrentStep(currentStep - 1);
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
                 {currentStep === 1 && <Step1 />}
                 {currentStep === 2 && <Step2 />}
                 {currentStep === 3 && <Step3 />}

            
            </div>

            <div className='AddProject-switch'>
                
                <button className='switch-btn' onClick={prevStep}><FiArrowLeft></FiArrowLeft>Prevous</button>
                <button className='switch-btn'>back</button>
                <button onClick={nextStep} className='switch-btn'>Next <FiArrowRight></FiArrowRight></button>
            </div>

        </div>
     

            
            
        </div>
    );
};

export default AddProject;