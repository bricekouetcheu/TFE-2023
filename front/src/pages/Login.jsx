import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { NavLink ,useNavigate} from 'react-router-dom';
import validator from 'validator';
import axios  from 'axios';


const Login = () => {

   
    //states
    const [email , setEmail] = useState('')
    const [password, setPassword]= useState('')
    const LoginUrl = process.env.REACT_APP_HOST+'api/login'
    const [errorMessage,setErrorMessage] = useState('') ;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const Navigate = useNavigate();

    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e)=>{
        if(validator.isEmail(email)){
            axios.post(LoginUrl ,{
                email: email,
                password : password,
                
            }).then(result=>{
                const data = result.data
               
                localStorage.setItem('token',data.accessToken)
                setIsAuthenticated(true)
                Navigate('/projects')
            })
            .catch(err=>{
                console.log(err)
                setErrorMessage('Check your credentials')
            })

        }else{
            setErrorMessage('Check your email')
        }

        e.preventDefault();
    }

    
    if (isAuthenticated) {
        return <Navigate to={'/projects'}/>;
      }
    return (
        <div className='login'>
            <div className='login-form-navbar'>
                <img className = 'login-form-logo' src={logo} alt=""/>

             </div>
     
            <form className='login-form'>
                <h2>Sign In</h2>
                {errorMessage &&
                (<label className='ErrorMessage'>{errorMessage}</label>)}
                <div className='login-form-content'>
                    <input type="email" id="email" name="email" required placeholder="Email..." value={email} onChange={handleEmail}/>
                    <input type="password" id="password" name="password" required placeholder="Password..." value={password} onChange={handlePassword}/>
 
                </div>
                <div className='login-form-checkbox'>
                        <p> <a href=""> Forgot password?</a></p>

                </div>
        
               

       
        

          <button className='form-btn' onClick={handleSubmit}>Login</button>
          <div className='login-form-signin'>
                <p>You don't have an account yet?<NavLink to="/register"><span> SignUp</span> </NavLink></p>

          </div>
          
         


        </form>

      </div>

    );
};

export default Login;