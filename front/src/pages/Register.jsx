import React, { useState } from 'react';
import logo from "../assets/logo.png";
import validator from 'validator';
import axios from 'axios'
import {useNavigate, NavLink } from "react-router-dom"



  const checkPassword = (a, b) => {
    return a === b;
    };

const Register = () => {


  //creation of state
  const [name,setName] = useState('')
  const [surname,setSurname] = useState('')
  const [compagny,setCompagny] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confPassword,setConfPassword] = useState('')
  const [ischecked,setIschecked] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const RegisterUrl = process.env.REACT_APP_API_HOST+'api/register'
  const Navigate = useNavigate()

  

  const handleName= (e)=>{
    setName(e.target.value)
  }
  const handleSurname= (e)=>{
    setSurname(e.target.value)
  }
  const handleCompagny= (e)=>{
    setCompagny(e.target.value)
  }
  const handleEmail= (e)=>{
    setEmail(e.target.value)
  }
  const handlePassword= (e)=>{
    setPassword(e.target.value)
  }
  const handleConfPassword= (e)=>{
    setConfPassword(e.target.value)
  }

  const handlecheckboxChange = (e)=>{
    setIschecked(e.target.checked)
  }
 
  const handleSubmit = (e) =>{

    if(validator.isEmail(email)){
        if(checkPassword(password,confPassword)){
            if(ischecked){
                axios.post(RegisterUrl ,{
                    name: name,
                    surname : surname,
                    compagny: compagny,
                    email: email,
                    password : password,
                    role_id : 2
                })
                .then(res =>{
                    console.log(res);
                    Navigate('/');
                }).catch( err =>{
                    console.log(err);
                    setErrorMessage('This email is already in use');
                }
                )
               

                
            }else(
              setErrorMessage('Please check the privacy policy')
            )
        }else(
          setErrorMessage('The passwords do not match.')
        )

    }else(
      setErrorMessage('Please check your email')
    )


  

    
       

    e.preventDefault();
}

  
  
  
  

    return (
      <div className='register'>
        <div className='register-form-navbar'>
            <img className = 'register-form-logo' src={logo} alt=""/>

        </div>
     
        <form className='register-form' >
          <h2>Sign up</h2>
          {errorMessage &&
              (<label className='ErrorMessage'>{errorMessage}</label>) }
          <div className='register-form-content'>
            <div className='register-form-left'>
             
               <input type="text" id="firstName" name="firstName" value={name} required placeholder="FirstName..." onChange={handleName}/>
               <input type="text" id="lastName" name="lastName" value={surname} required placeholder="LastName" onChange={handleSurname}/>
               <input type="text" id="compagny" name="compagny" value={compagny} required placeholder="Compagny..." onChange={handleCompagny}/>
               

            </div>


            <div className='register-form-right'>
              <input type="email" id="email" name="email"  value={email} required placeholder="Email..." onChange={handleEmail}/>
              <input type="password" id="password1" name="password1" value={password} required placeholder="Enter your password..." onChange={handlePassword}/>
              <input type="password" id="password2" name="password2" value= {confPassword} required placeholder="Confirm your password..." onChange={handleConfPassword}/>

             </div>
          </div>
          <div className='register-form-checkbox'>
                <label htmlFor="">
                      <input type="checkbox" checked={ischecked} onChange={handlecheckboxChange} required/>
                      <span>I agree to terms & conditions</span>

                </label>
                      

                 
              </div>
               

       
        

          <button className='form-btn' onClick={handleSubmit}>SignUp</button>
          <div className='register-form-signin'>
          <p> Already have an account?   <NavLink to='/'><span>SignIn</span></NavLink></p>

          </div>
          
         


        </form>

        



      </div>


      
    );
};

export default Register;