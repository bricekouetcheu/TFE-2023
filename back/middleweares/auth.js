const pool = require('../db.js');
const axios = require('axios');
const { access } = require('fs-extra');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library')
require("dotenv").config();

const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next)=> {
  const token = req.cookies.SessionToken; //get token from cookies
  

  try {
    if (!token) {
     
      res.status(403).send({
        "message": "vous n'etes pas authorisé à effectuer cette operation",
        "error" : "acces refusé"
      })

    }else{
      const decodedToken = jwt.verify(token, process.env.TOKEN_PASS); // checking and decode token
      req.user = decodedToken; //add user informations to request body
      next(); 
    }
  } catch (err) {
    res.status(401).json({ error: 'token invalid' }); 
  }
}








exports.checkAuthorization = async(req, res, next)=>{
  const token = req.cookies.SessionToken;
   try{
    if (!token) {
      
      res.status(403).send({
        "message": "vous n'etes pas authorisé à effectuer cette operation",
        "error" : "acces refusé"
      })

    }else{
      const decodedToken = jwt.verify(token, process.env.TOKEN_PASS); // Vérification et décodage du token
      req.user = decodedToken;
      const user_id = req.user.user_id
  
      const project_id = req.params.project_id
    
      const query = 'SELECT EXISTS (SELECT 1 FROM projects WHERE project_id = $1 AND user_id = $2) AS is_owner;';
      const result = await pool.query(query,[project_id, user_id])
  
  
      if(result.rows[0].is_owner){
          
             next();
             
      }else{
        
        return res.status(403).send("vous n'avez pas acces a ce projet")
      }
      
    }
    
   

   }catch(err){
    console.log(err)
    res.status(500).send('erreur serveur')   }
 


}

