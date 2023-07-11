import React, { useState } from 'react';
import {isMobile} from 'react-device-detect';
import Navbar from '../composants/Navbar';
import imageIcon from '../assets/image.png';
import { MdDelete} from "react-icons/md";
import { faXmark,faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Checking = () => {

    const [image , setImage] = useState(null)
    const [drag, setDrag] = useState(false)
    const [progress, setProgress] = useState(0)

    
    console.log(image)

    const handleDrag = (e)=>{
        console.log('bonjour')
        e.preventDefault()
        e.stopPropagation()
        if(e.type === 'dragenter' || e.type === "dragover"){
            setDrag(true)
        }else if(e.type === 'dragleave'){
            setDrag(false)

        }
    }

    const handleDrop = (e)=>{
        console.log('bonsoir')
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0])
          }

    }
   
    const handleFileUpload = (e)=>{
        e.preventDefault()
        console.log('vvvvv')
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
          }
     
       /* const Timer = setInterval(()=>{
            setProgress((prevProgress)=>{
                if(prevProgress<100){
                    return prevProgress + 10
                }
                clearInterval(Timer);
                return prevProgress
            });
        },200)
        setTimeout(() => {
            clearInterval(Timer);
        }, 2000);*/
    }

  

    const handleFileDelete = ()=>{
        setImage(null)
    }

  

    const renderContent = ()=>{
        if(isMobile){
            return(
            <div className='checking-page-mobile'>


            </div>
            )
        }
        return(
            <div  className={`checking-upload ${image ? 'checking-upload-image' : ''}`}>
                  <div onDragEnter={handleDrag}  className={`checking-page-browser ${image ? 'checking-page-browser-uploaded' : ''} ${drag ? 'drag-active' : ''}`} >
                  { drag && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                        <div className='checking-upload-icon'>
                            <input type="file"  className='input-field' hidden multiple  name='file' onChange={handleFileUpload} />
                            <img alt='upload img' src={imageIcon} className='checking-page-icon'/>
                            <div>
                                <h2>Glissez et Deposez votre <span>image</span></h2>
                                <span>ou</span>
                                <p onClick={()=>{document.querySelector('.input-field').click()}}>Selectionnez votre image</p>


                            </div>
                            

                            
                        </div>
                       
                
                    </div>
                    {(image)?
                        (
                        <div className='image-Uploaded'>
                            <div>
                                <img src={URL.createObjectURL(image)} alt='upload file'/>
                                <span>{image.name}</span>
                            </div>
                            <FontAwesomeIcon icon={faXmark} onClick={ handleFileDelete} />

                        </div>
                        )
                         :
                         (
                            <div></div>
                        )
 
                       } 
           
            </div>
               
                
        )
    }
        
    return (
        <div className='checking-page'>
            <Navbar></Navbar>
            <div className='checking-page-content'>
                <p className='checking-title'>Verification du Bon de livraison</p>
                {renderContent()}
            
            </div>
            
        </div>
    );
};

export default Checking;