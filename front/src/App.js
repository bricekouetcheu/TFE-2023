
import AllRoutes from './AllRoutes';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {






  return (
    <GoogleOAuthProvider clientId='258944777548-o6ip0hgnoa4ctgi6e264tqqptcuukv6u.apps.googleusercontent.com'>
         <div className="App">
      <BrowserRouter>
        <AllRoutes></AllRoutes> 
      </BrowserRouter>
         
    </div>
      
    </GoogleOAuthProvider>
 
  );
}

export default App;
