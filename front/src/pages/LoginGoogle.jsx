import React , {useEffect, useState} from 'react';
import logo from "../assets/logo.png";
import login from "../assets/login.png";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleButton from 'react-google-button'
import { NavLink ,useNavigate , Navigate} from 'react-router-dom';




const LoginGoogle = () => {
    const LoginUrl = process.env.REACT_APP_API_HOST+'api/login/google'
    const Navigate = useNavigate()
    const AuthUrl = process.env.REACT_APP_API_HOST+`api/auth`;
    const [redirect,setRedirect] = useState(false);

    console.log(redirect)


   const checkAuthentication = async()=>{
            
        try{
            console.log('trop connnn')
            const response = await axios.get(AuthUrl,{withCredentials:true})
            
            if(response.data === "authentifié"){
    
                
                setRedirect(true)
                console.log('test1 bonjour')
            }else{
            
                setRedirect(false) 
                

            }
           
        }catch(err){
            console.log(err)
            setRedirect(false);
    
        }
    }

    const getUser = async(code)=>{
        const result = await axios.post(LoginUrl,
            {
                code:code,
                grant_type: 'authorization_code',
                
            },
            {
                 withCredentials: true
             }
            )

            console.log(result)

         if(result.data === "connexion reussie"){
               
             
                Navigate('/')

             

            }
    }
    const loginF = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly ',
        onSuccess: tokenResponse => getUser(tokenResponse.code),
        flow: 'auth-code'
      });

     useEffect(()=>{
        if(redirect){
            setTimeout(()=>{
                console.log('biceeee')
              
            } , 800)
          
        }
     }, [redirect])
    
    return (
        
               <div className='loginTest'>
            <div className='left-login'>
                <div className='loginTest-form-navbar'>
                    <img src={logo} alt=""/>

                 </div>
                 <div className='login-content'>
                    <h1>Bienvenue.</h1>
                    <p>Optimisez votre processus de livraison de béton avec notre solution intelligente et efficace...</p>      
                    
                    <div className='login-btn'>
                        <GoogleButton
                            type="light"
                            label='Continuez avec Google'
                            onClick={() => loginF()}  
                        />

                    </div>

                 </div>
            </div>
            <div className='right-login'>
                   <img src={login} alt="login img"/>
            </div>
           
            
            
        </div>

       
    );
};

export default LoginGoogle;