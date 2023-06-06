import {useState, React} from 'react';
import { MdDelete} from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';





const StepThree = ( {values, handleFormData, onPrev, OnSubmit,deleteFile }) => {
    const [uploadedFile, setUploadedFile] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('')

 


    const handleSubmit = (e)=>{
       
        e.preventDefault()

        if(values.files.length === 0 ){
            setErrorMessage('Please fill in all fields' )
            
        } else{
            OnSubmit();
            console.log('Non')
        }
    }
    return (
        <div className='step3'>
        <div className='step3-upload' onClick={()=>{document.querySelector('.input-field').click()}}>
        {( values.files.length === 0 ) ? (<p> </p>) :
                        <ul>
                            {Array.from(values.files)
                            .map((file,index) => (
                               <> <li key={index}>
                                    <span className="file-icon"><MdDelete onClick={(index) => deleteFile(index)}/></span>
                                    <span className="file-name">{file.name}</span>
                                </li> </>))}
                            </ul>
                        
                        
                            }
                <div className='step3-upload-icon'>
                    <input type="file"  className='input-field' hidden multiple  name='file' onChange={handleFormData}/>
                    <FontAwesomeIcon icon={faCloudArrowUp} beatFade size='xl' className='icon'/>
                    <h2>Upload your IFC files here</h2>

                </div>
                
               

        </div>
        <div className='step3-navigation'>
                <button onClick={onPrev}>Previous</button>
                <button>Home</button>
                <button onClick={OnSubmit}>Next</button>

            </div>
        
      </div>
    );
};

export default StepThree;