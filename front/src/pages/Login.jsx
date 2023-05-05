import React from 'react';
import logo from "../assets/logo.png";

const Login = () => {
    return (
        <div className='login'>
            <div className='login-form-navbar'>
                <img className = 'login-form-logo' src={logo} alt=""/>

             </div>
     
            <form className='login-form'>
                <h2>Login</h2>
                <div className='login-form-content'>
                    <input type="email" id="email" name="email" required placeholder="Email..."/>
                    <input type="password" id="password" name="password" required placeholder="Password..."/>


                </div>
          <div className='login-form-checkbox'>
             <p> <a href=""> Forgot password?</a></p>
                      

                 
          </div>
               

       
        

          <button className='login-form-btn'>Login</button>
          <div className='login-form-signin'>
          <p>you don't have an account yet?<a href=""> SIGN UP</a></p>

          </div>
          
         


        </form>

      </div>

    );
};

export default Login;