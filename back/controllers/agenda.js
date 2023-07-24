
const axios = require('axios');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library')
require("dotenv").config();
const axiosInstance = axios.create()
const jwt = require('jsonwebtoken');
const pool = require('../db.js');

const api_key = process.env.API_KEY



// refreshToken function
const refreshAccessToken = async(refreshToken)=>{
    try{
        const user = new UserRefreshClient(
            process.env.GOOGLE_ID_CLIENT,
            process.env.GOOGLE_CLIENT_SECRET, 
            refreshToken)
  
        const {credentials} = await user.refreshAccessToken()
        const newAccessToken = credentials.access_token
  
        return newAccessToken
    }
  catch(err){
    console.log(err)
  }
  
  }
  
  //get accessToken from one user
  
  const getAccessTokenfromUser = async(userId)=>{
    try{
      const accessTokenQuery = 'SELECT access_token from users WHERE user_id = $1'
      const response = await pool.query(accessTokenQuery ,[userId])
  
      const result = response.rows[0].access_token
  
      return result
  
    }catch(err){
      console.log(err)
      res.status(500).send('erreur serveur')
    }
    
  }
  
  // get refreshToken from one user
  const getRefreshTokenfromUser = async(userId)=>{
    try{
      const accessTokenQuery = 'SELECT refresh_token from users WHERE user_id = $1'
      const response = await pool.query(accessTokenQuery ,[userId])
  
      const result = response.rows[0].refresh_token
  
      return result
  
    }catch(err){
      console.log(err)
      res.status(500).send('erreur serveur')
    }
    
  }
  
  //get if accessToken is still valid
  
  const checkAccessToken = (token)=>{
    
    const decodedToken = jwt.decode(token)
  
    if(!decodedToken || !decodedToken.exp ){
      return true
    }
  
    const expiration = decodedToken.exp * 1000;
    const currentDate = Date.now()
    const isExpired =  expiration <= currentDate;
  
    return isExpired
  
  }
  
  // interceptors before any request
 // intercepteurs avant chaque requête
axiosInstance.interceptors.request.use(async (config) => {
  if (config.userId) { // Vérifiez si userId est présent dans la configuration
    const accessToken = await getAccessTokenfromUser(config.userId);

    const isAccessTokenIsExpired = checkAccessToken(accessToken);

    if (isAccessTokenIsExpired) {
      const refreshToken = await getRefreshTokenfromUser(config.userId);
      const newAccessToken = await refreshAccessToken(refreshToken);

      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
}, (err) => {
  return Promise.reject(err);
});




exports.getAllAgendas = async (req, res) => {
  try {
    const response = await axiosInstance.get(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      {
        userId: req.user.user_id, // Passez userId dans l'objet de configuration
      }
    );

    const agendas = response.data.items;
    res.status(200).send(agendas);
  } catch (err) {
    console.log(err);
    res.status(500).send('erreur serveur');
  }
};
