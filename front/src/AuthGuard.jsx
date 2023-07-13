import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AuthGuard = ({children}) => {

    const isAuthenticated = useContext(AuthContext)
    console.log(isAuthenticated)
   

    return isAuthenticated ? children : <Navigate to= '/'></Navigate>

   
};

export default AuthGuard;