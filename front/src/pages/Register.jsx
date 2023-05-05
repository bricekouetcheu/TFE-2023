import React from 'react';
import logo from "../assets/logo.png";

const Register = () => {
    return (
      <div className='register'>
        <div className='register-form-navbar'>
            <img className = 'register-form-logo' src={logo} alt=""/>

        </div>
     
        <form className='register-form'>
          <h2>Registration</h2>
          <div className='register-form-content'>
            <div className='register-form-left'>
               <input type="text" id="firstName" name="firstName" required placeholder="firstName..."/>
               <input type="text" id="lastName" name="lastName" required placeholder="lastName"/>
               <input type="text" id="compagny" name="compagny"  required placeholder="Compagny..."/>
               

            </div>


            <div className='register-form-right'>
              <input type="email" id="email" name="email"  required placeholder="Email..."/>
              <input type="password" id="password1" name="password1"   required placeholder="Enter your password..."/>
              <input type="password2" id="password2" name="password2" required placeholder="Confirm your password..."/>

             </div>

          </div>
          <div className='register-form-checkbox'>
                <label htmlFor="">
                      <input type="checkbox" />
                      <span>I agree to terms & conditions</span>

                </label>
                      

                 
              </div>
               

       
        

          <button className='register-form-btn'>Submit</button>
          <div className='register-form-signin'>
          <p>already have an account?   <a href=""> SIGN IN</a></p>

          </div>
          
         


        </form>

      </div>


      
    );
};

export default Register;