import React , {useState , useRef, useEffect} from "react";
import Navbar from "../composants/Navbar";
import { faXmark,faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imageIcon from "../assets/image.png";
import camera from "../assets/photo.png";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {checkValidity} from './utils'
import { ModifyObject } from './utils';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
const Check = () => {


    const {casting_id} = useParams()
    const [image , setImage] = useState()
    const [drag, setDrag] = useState(false)
    const [order, setOrder] = useState()
    const getOneOrderUrl = process.env.REACT_APP_API_HOST+`api/order/${casting_id}`
    const updateCastingUrl = process.env.REACT_APP_API_HOST+`api/castings/${casting_id}`
    const scrollRef = useRef()
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const postImageUrl = process.env.REACT_APP_API_HOST+'api/detection'


    
  const UpdateCastingStatus = async()=>{
    try{
      const result = await axios.put(updateCastingUrl,{withCredentials:true})
     

    }catch(err){
      console.log(err)
    }
    

  }

    const getOrder = async()=>{
        try{
            const response =  await axios.get(getOneOrderUrl,{withCredentials:true})
            setOrder(ModifyObject(response.data.order_data))
        }catch(err){
            console.log(err)
        }
       

    }
    

    const scrolltolastElement = ()=>{
        const element = scrollRef?.current
        element?.scrollIntoView({ behavior: 'smooth' });
    }


    const handleClose = () => {
        setOpenBackdrop(false);
    };
    const handleOpen = () => {
        setOpenBackdrop(true);
    };


    const handleImageUpload = (e)=>{
        e.preventDefault()
        
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
          }  
    }

    
    const handleImageCapture = (e)=>{
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
          }  


    }

    const handleImageDelete = ()=>{
        setImage(null)
    }

    const handleSubmitImage = async()=>{
        try{
            const formData = new FormData();
            formData.append('image', image);
            setOpenBackdrop(true)
            const response = await axios.post(postImageUrl, formData,
               {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            
            }) 
            if(response){
                const deliveryData = response.data
                if(checkValidity(ModifyObject(order), deliveryData)){
                setOpenBackdrop(false)
                Swal.fire({
                        icon: 'success',
                        title: 'Les caracteristiques correspondent bien à la commande',
                        showConfirmButton: true,
                        confirmButtonColor: '#00BCB6',
                        timer: 10000,
                        
                      });
                      UpdateCastingStatus()
                }else{
                    setOpenBackdrop(false)
                    Swal.fire({
                        icon: 'warning',
                        title: 'Les caracteristiques ne correspondent pas à la commande',
                        showConfirmButton: true,
                        confirmButtonColor: '#00BCB6',
                        timer: 10000,
                        
                      });

                }
               
                

            }
        
               
        }catch(err){
            console.log(err)

    }
            
}      
   


    const getSizeToKilo = (value)=>{
        const Ko = value/1024;
        const roundedKilo = Math.round(Ko * 100) / 100;

        return roundedKilo + 'ko'
    }
    useEffect(()=>{
        getOrder()
    },[])

    useEffect(()=>{
        scrolltolastElement()
    },[image])
    return (
        <div className='checking-page'>
           <Navbar currentPage='check'></Navbar>
            <div className='Checking-Page-Content'>
                <div className='checking-page-title'>
                    <h1>Verification de la livraison</h1>
                </div>
                <div className='checking-page-options'>
                    <div className='take-photo-content' onClick={()=>{document.querySelector('.camera-field').click()}}>
                    <input type="file"  className='camera-field' hidden multiple  name='file' onChange={handleImageCapture} accept="capture=camera,image/*" />
                        <img src={camera} alt='camera icon'></img>
                        <h2>Prendre une photo</h2>
                    </div>
                    <div className='between'>
                        <span>Ou</span>
                    </div>
                    <div className='upload-photo-content' onClick={()=>{document.querySelector('.upload-field').click()}}>
                        <input type="file"  className='upload-field' hidden multiple  name='file' onChange={handleImageUpload} />
                        <img src={imageIcon} alt='camera icon'></img>
                        <h2>Uploader votre image</h2>
                    </div>

                </div>

                {(image)?
                    (
                        <>
                            <div className='image-content'>
                                <div className='image-content-div'>
                                    <img src={URL.createObjectURL(image)} alt='upload file'/>
                                    <div className='image-infos'>
                                        <span className='image-name'>{image.name}</span>
                                        <span className='image-size'>{getSizeToKilo(image.size)}</span>
                                    </div>
                                </div>
                                <FontAwesomeIcon icon={faTrash} onClick={ handleImageDelete} className='delete-icon' />
                            </div>

                            <button className='check-btn' onClick={handleSubmitImage} ref={scrollRef}>Lancer la verification</button>
                        </>            )
                                    :
                                    (
                                    <div></div>
                                    )} 
                  
                        </div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackdrop}
                            onClick={handleClose}
                        >
                            <CircularProgress color="success" />
                     </Backdrop>
            
        </div>
    );
};

export default Check;