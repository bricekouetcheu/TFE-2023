import {useState,React} from 'react';
import StepOne from '../composants/StepOne';
import StepTwo from '../composants/StepTwo';
import StepThree  from '../composants/StepThree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { faFileSignature} from '@fortawesome/free-solid-svg-icons';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

// filter file before uploading
const filterIFCFiles = (files) => {
    const allowedExtensions = ["ifc"];
  
    const filteredFiles = files.filter((file) => {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      return allowedExtensions.includes(fileExtension);
    });
  
    const invalidFiles = files.filter((file) => !filteredFiles.includes(file));
  
    if (invalidFiles.length > 0) {
      const errorMessage = "Seuls les fichiers de type IFC sont autorisés.";
      // Faites quelque chose avec le message d'erreur, par exemple, l'afficher à l'utilisateur ou effectuer une action spécifique.
      console.log(errorMessage);
    }
  
    return filteredFiles;
  };





const createAddress = (street, number, city, postalCode) => {
    const address = `${street} ${number}, ${postalCode} ${city}`;
    return address;
  }
  

const NewProject = () => {
    const Navigate = useNavigate();
    const NewProjectUrl = process.env.REACT_APP_HOST+'api/project'
    const config = {
      headers:{"accessToken" : localStorage.getItem('token')}
    }
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [ <FontAwesomeIcon icon={faFileSignature} />, <FontAwesomeIcon icon={faLocationDot} />,<FontAwesomeIcon icon={faFile} />];
    const [progress, setProgress] = useState(0);
    const [formData, setFormData]= useState({
        projectName: "",
        street: " ",
        number:" ",
        city:"",
        postalcode: "",
        files:[]
    })
   
   

    const handleInputData = input => e => {
        // input value from the form
        const {value } = e.target;
    
        // updating for data state taking previous state and then adding new value to create new object
        setFormData(prevState => ({
          ...prevState,
          [input]: value
      }));
      }
      
      // handle file upload
      const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const filteredFiles = filterIFCFiles(files);
        setFormData((prevState) => ({
          ...prevState,
          files:filteredFiles,
        }));
      };

      

      //handle deleting files before submit
      const handleFileDelete = (index) => {
        setFormData((prevState) => {
          const updatedFiles = [...prevState.files];
          updatedFiles.splice(index, 1);
          return {
            ...prevState,
            files: updatedFiles,
          };
        });
      };

    

    //handle navigation between different steps
    const nextStep = ()=>{
        setCurrentStep(currentStep+1)
    }

    const prevStep = ()=>{
        setCurrentStep(currentStep-1)
    }

    const Files = new FormData()
    //continuer le formData
    Files.append("name",formData.projectName)
    Files.append("address",createAddress (formData.street, formData.number, formData.postalcode, formData.city))
    formData.files.forEach((file)=>{
        Files.append('ifc',file,file.name)
    })

    

    //submit formdata
    const submitForm = (e)=>{
        e.preventDefault()
           
       axios
       .post(NewProjectUrl,Files,config)
       .then( result=>{
        Navigate('/projects')
        })
        .catch(err=>{
          console.log(err)
        })
          }
    

    return (
        <div className='AddProject'>
            
        <div className='AddProject-ul'>
        <h1>Ajouter Nouveau projet </h1>
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
                 {currentStep === 2 && <StepTwo  onNext={nextStep} onPrev={prevStep} handleFormData={handleInputData} values={formData} />}
                 {currentStep === 3 && <StepThree onPrev={prevStep} handleFormData={handleFileUpload } values={formData} OnSubmit={submitForm } deleteFile={handleFileDelete} />}
               

            
            </div>

         

        </div>
     

            
            
        </div>
    );
};

export default NewProject;