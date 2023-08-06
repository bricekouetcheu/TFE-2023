
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


const timestampToDatetime = (timestamp)=>{

   const dateInMilliseconds = timestamp * 1000;
  const dateObject = new Date(dateInMilliseconds);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');

  const timezoneOffset = -dateObject.getTimezoneOffset() / 60;
  const timezoneOffsetString = timezoneOffset >= 0 ? `+${String(timezoneOffset).padStart(2, '0')}:00` : `${String(timezoneOffset).padStart(3, '0')}:00`;

  const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffsetString}`;
  return dateTimeString;
}


exports.createNewEvent = async(req, res)=>{
    const { agendaId, timestamp, summary, description } = req.body;
    

    try{
        
        const event = {
            summary: summary,
            description: description,
            start: {
              dateTime: timestampToDatetime(timestamp),
              timeZone: 'Europe/Brussels', 
            },
            end: {
              dateTime: timestampToDatetime(timestamp),
              timeZone: 'Europe/Brussels', 
            },
            reminders: {
              useDefault: false,
              overrides: [
                {
                  method: 'email',
                  minutes: 2 * 24 * 60, // reminder 2 days before event
                },
              ],
            }
          };

          const response = await axiosInstance.post(`https://www.googleapis.com/calendar/v3/calendars/${agendaId}/events` , event,
          {
            userId: req.user.user_id
          });

          const createdEvent = response.data
      

          res.status(201).send('Nouvel evennement crée')

    }catch(err){
        console.log(err)
        res.status(500).send("erreur serveur")

    }
}


exports.getAllEventFromCalendar = async(req, res)=>{

  const {agendaId} = req.params
  try{
    const response = await axiosInstance.get(`https://www.googleapis.com/calendar/v3/calendars/${agendaId}/events`, {
      userId: req.user.user_id,
    });

    const Events = response.data.items

    //sort events by starting date

    Events.sort((a, b) => {
      const dateA = new Date(a.start.dateTime);
      const dateB = new Date(b.start.dateTime);
      return dateA - dateB;
    });

    
    const firstUpcomingEvent = Events.find(event => {
      const eventDate = new Date(event.start.dateTime);
      const currentDate = new Date();
      return eventDate >= currentDate;
    });


    res.status(200).json(firstUpcomingEvent);
  }catch(err){
    console.log(err)
    res.status(500).send('erreur serveur')
  
  }

}