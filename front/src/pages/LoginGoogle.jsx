import React from 'react';
import logo from "../assets/logo.png";
import login from "../assets/login.png";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleButton from 'react-google-button'
import { NavLink ,useNavigate} from 'react-router-dom';




const LoginGoogle = () => {
    const LoginUrl = process.env.REACT_APP_API_HOST+'api/login/google'
    const Navigate = useNavigate()


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

         if(result.data === "connexion reussie"){
            console.log('test2 bonjour')
                Navigate('/projects')

            }
    }
    const loginF = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/calendar  https://www.googleapis.com/auth/gmail.send',
        onSuccess: tokenResponse => getUser(tokenResponse.code),
        flow: 'auth-code'
      });
    
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