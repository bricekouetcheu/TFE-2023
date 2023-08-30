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

 

    /**
     * Checks user authentication status by making a GET request to the authentication URL.
     * Updates the state to indicate if the user is authenticated or not.
     * @async
     * @function
     * @name checkAuthentication
     * @returns {void}
     */
    const checkAuthentication = async () => {
        try {
            console.log('Checking authentication...');
            const response = await axios.get(AuthUrl, { withCredentials: true });

            if (response.data === "authenticated") {
                // User is authenticated
                setRedirect(true);
                console.log('User authenticated');
            } else {
                // User is not authenticated
                setRedirect(false);
                console.log('User not authenticated');
            }
        } catch (err) {
            console.log(err);
            setRedirect(false); // Error occurred, assume user is not authenticated
        }
    };


    /**
     * Logs in a user by sending an authorization code to the login URL.
     * Navigates to the home page if the login is successful.
     * @async
     * @function
     * @name getUser
     * @param {string} code - The authorization code obtained during the login process.
     * @returns {void}
     */
    const getUser = async (code) => {
        try {
            const result = await axios.post(
                LoginUrl,
                {
                    code: code,
                    grant_type: 'authorization_code'
                },
                {
                    withCredentials: true
                }
            );

            if (result.data === "connexion reussie") {
                // Login successful, navigate to the home page
                Navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

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

                        <p>Pour en savoir plus sur notre engagement en matière de protection des données et de confidentialité, veuillez consulter notre politique de confidentialité <a href='https://bimcasting.digitalconstruction.cloud/rgpd'>ici</a>.</p>  

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