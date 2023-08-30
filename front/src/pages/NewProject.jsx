/* eslint-disable react/jsx-key */
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
     
    }
  
    return filteredFiles;
  };





const createAddress = (street, number, city, postalCode) => {
    const address = `${street} ${number}, ${postalCode} ${city}`;
    return address;
  }
  

const NewProject = () => {
    const Navigate = useNavigate();
    const NewProjectUrl = process.env.REACT_APP_API_HOST+'api/project'
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [ <FontAwesomeIcon icon={faFileSignature} />, <FontAwesomeIcon icon={faLocationDot} />,<FontAwesomeIcon icon={faFile} />];
    const [progress, setProgress] = useState(0);
    const [formData, setFormData]= useState({
        projectName: "",
        AgendaId : " ",
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

      const handleSelectData = select => e => {
        // input value from the form
        const {value } = e.target;
    
        // updating for data state taking previous state and then adding new value to create new object
        setFormData(prevState => ({
          ...prevState,
          [select]: value
      }));
      }


      /**
       * Handles file upload by filtering and updating the list of files in the form data.
       * @function
       * @name handleFileUpload
       * @param {Object} e - The event object containing information about the file input.
       * @returns {void}
       */
      const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const filteredFiles = filterIFCFiles(files); // Implement filterIFCFiles function
        setFormData((prevState) => ({
            ...prevState,
            files: filteredFiles,
        }));
      };

        /**
        * Handles deletion of a file from the list of files in the form data.
        * @function
        * @name handleFileDelete
        * @param {number} index - The index of the file to be deleted.
        * @returns {void}
        */
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

        /**
        * Moves the form to the next step by incrementing the current step value.
        * @function
        * @name nextStep
        * @returns {void}
        */
        const nextStep = () => {
          setCurrentStep(currentStep + 1);
        };

        /**
        * Moves the form to the previous step by decrementing the current step value.
        * @function
        * @name prevStep
        * @returns {void}
        */
        const prevStep = () => {
          setCurrentStep(currentStep - 1);
        };


    const Files = new FormData()

    //continuer le formData
    Files.append("name",formData.projectName)
    Files.append("agenda" , formData.AgendaId)
    Files.append("address",createAddress (formData.street, formData.number, formData.postalcode, formData.city))
    formData.files.forEach((file)=>{
        Files.append('ifc',file,file.name)
    })

    

    
      /**
     * Submits the form data to create a new project by making a POST request.
     * Navigates to the home page upon successful submission.
     * @function
     * @name submitForm
     * @returns {void}
     */
    const submitForm = () => {
      axios
          .post(NewProjectUrl, Files, { withCredentials: true })
          .then((result) => {
              Navigate('/');
          })
          .catch((err) => {
              console.log(err);
          });
    };

    

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
                 {currentStep === 1  && <StepOne onNext={nextStep} handleFormData={handleInputData} handleSelectData = {handleSelectData}values={formData} />}
                 {currentStep === 2 && <StepTwo  onNext={nextStep} onPrev={prevStep} handleFormData={handleInputData} values={formData} />}
                 {currentStep === 3 && <StepThree onPrev={prevStep} handleFormData={handleFileUpload } values={formData} OnSubmit={submitForm } deleteFile={handleFileDelete} />}
               

            
            </div>

         

        </div>
     

            
            
        </div>
    );
};

export default NewProject;