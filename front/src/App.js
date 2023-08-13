/* eslint-disable react/react-in-jsx-scope */

import AllRoutes from './AllRoutes';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// eslint-disable-next-line require-jsdoc
function App() {

  const clientId = process.env.REACT_APP_GOOGLEID;




  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GoogleOAuthProvider clientId={clientId}>
      
      <div className="App">
      
      <BrowserRouter>
        
        <AllRoutes></AllRoutes> 
      </BrowserRouter>
         
    </div>
      
    </GoogleOAuthProvider>
 
  );
}

export default App;
