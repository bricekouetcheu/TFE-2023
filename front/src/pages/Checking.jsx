import React, { useEffect, useRef, useState } from 'react';
import {isMobile} from 'react-device-detect';
import Navbar from '../composants/Navbar';
import imageIcon from '../assets/image.png';

import { faXmark,faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Checking = () => {

    const [image , setImage] = useState(null)
    const [drag, setDrag] = useState(false)
    const scrollRef = useRef()

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
   
    //upload du fichier
    const handleFileUpload = (e)=>{
        e.preventDefault()
        
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
          }
         
     
    }

    // scroll vers le bas au moment de l'upload
    const scrolltoLastElement = ()=>{
        
        const lastElement = scrollRef.current?.lastElement ;
        lastElement?.scrollIntoView({ behavior: 'smooth' });
    }
  

    const handleFileDelete = ()=>{
        setImage(null)
    }


    const handleSubmit = (e)=>{
        
    }

    useEffect(()=>{
        if(image){
            scrolltoLastElement()
        }
       
    },[image])
  

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
                                <p onClick={()=>{document.querySelector('.input-field').click()}}>Selectionnez la</p> 


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
                            <FontAwesomeIcon icon={faXmark} onClick={ handleFileDelete} className='delete-icon' />

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
            <div className= {`checking-page-content ${image ? 'checking-page-content-image' : ''}`} ref={scrollRef}>
                <p className='checking-title'>Verification du Bon de livraison</p>
                {image ? (
                    
                      <>
                       {renderContent()}
                     <button className='checking-btn'> Lancer la Verification</button>
                     
                     </>  

                   
                ):(
                    renderContent()
                )

                }


                
            
            </div>
            
        </div>
    );
};

export default Checking;