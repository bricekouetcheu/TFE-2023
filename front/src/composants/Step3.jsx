import {useState, React} from 'react';
import { MdDelete} from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';





const Step3 = () => {

    const [uploadedFile, setUploadedFile] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    

    const handleFileUpload = (event) => {
        const file = event.target.files;
        setUploadedFile(file);
        setIsUploading(true);

        setTimeout(() => {
            setIsUploading(false);
          }, 2000);
        };

    return (
      <div className='step3'>
        <div className='step3-upload' onClick={()=>{document.querySelector('.input-field').click()}}>
        {( uploadedFile.length === 0 ) ? (<p></p>) :
                        <ul>
                            {Array.from(uploadedFile)
                            .map((file,index) => (
                               <> <li key={index}>
                                    <span className="file-icon"><MdDelete /></span>
                                    <span className="file-name">{file.name}</span>
                                </li> </>))}
                            </ul>
                        
                        
                            }
                <div className='step3-upload-icon'>
                    <input type="file"  className='input-field' hidden multiple   onChange={handleFileUpload}/>
                    <FontAwesomeIcon icon={faCloudArrowUp} beat  size='xl' className='icon'/>
                    <h2>Upload your IFC files here</h2>

                </div>
                
               

        </div>
        
      </div>
    );
  };

  export default Step3;