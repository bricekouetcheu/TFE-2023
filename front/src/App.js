
import AllRoutes from './AllRoutes';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { BrowserRouter } from 'react-router-dom';

function App() {






  return (
    
    <div className="App">
      <BrowserRouter>
        <AllRoutes></AllRoutes> 
      </BrowserRouter>
         
    </div>
  );
}

export default App;
