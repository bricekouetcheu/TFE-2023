
const axios = require('axios');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library')
require("dotenv").config();
const axiosInstance = axios.create()
const jwt = require('jsonwebtoken');
const pool = require('../db.js');

const api_key = process.env.API_KEY

const addEventToCasting = async(castId , eventId)=>{

  try{
    const addEventToCastingQuery = `  UPDATE castings SET event_id = $1 WHERE casting_id = $2`;

   await pool.query(addEventToCastingQuery , [eventId , castId])

  } catch(err){
    console.log(err)
  }
  
}


const getProjectInfosFromId = async (event_id) => {
  try {
    const getProjectInfosQuery = `
      SELECT p.project_name, p.project_address
      FROM projects p
      JOIN castings c ON p.project_id = c.project_id
      WHERE c.event_id = $1
    `;

    const getProjectInfosResult = await pool.query(getProjectInfosQuery, [event_id]);
    const projectInfo = getProjectInfosResult.rows[0];
    
    

    return projectInfo;
  } catch (error) {
    console.error('Error getting project information:', error);
    throw error;
  }
};

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
axiosInstance.interceptors.request.use(async (config) => {
  if (config.userId) { 
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
    const { agendaId, timestamp, summary, description , castingId } = req.body;
    

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
          await addEventToCasting(castingId, createdEvent.id);
      

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

    const enrichedEvents = await Promise.all(
      Events.map(async (Event) => {
        const event_id = Event.id; // ID de l'événement
      
        // get informations projects
        const projectInfo = await getProjectInfosFromId(event_id);
       

        // Associez les informations du projet à l'événement
        return {
          ...Event,
          project_name: projectInfo.project_name,
          project_address: projectInfo.project_address,
        };
      })
    );

    res.status(200).send(enrichedEvents);
  }catch(err){
    console.log(err)
    res.status(500).send('erreur serveur')
  
  }

}