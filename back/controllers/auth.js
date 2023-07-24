const pool = require('../db.js');
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
require("dotenv").config();

/*const oauth2Client = new OAuth2 (
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',

)

const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
  ];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes
  });*/
const { OAuth2Client, UserRefreshClient } = require('google-auth-library')
const client = new OAuth2Client(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',
    ['https://www.googleapis.com/auth/calendar'])

    const getUserByEmail = 'select * from users where user_email = $1'
    const addUserRequest = 'INSERT INTO users (user_id,user_name,user_surname,user_email, access_token, refresh_token, role_id ,user_picture) values(DEFAULT,$1,$2,$3,$4,$5,2 ,$6) RETURNING  user_id';
    const updateTokensQuery = 'UPDATE users SET access_token = $1, refresh_token = $2 WHERE user_id = $3';

    const generateToken = (user_id, given_name, family_name, email )=>{
        return jwt.sign({
            user_id : user_id,
            surname: given_name,
            name : family_name,
            email: email,}, 
            process.env.TOKEN_PASS,
            { expiresIn: '24h'})

    }


    exports.googleLogin = async (req, res)=>{

        const hours = 12;
        const maxAgeInMilliseconds = hours * 60 * 60 * 1000;

        try{
          
            //on recupere les informations envoyées par le user au moment de la connexion
            const {tokens} = await client.getToken(req.body.code)
            const {access_token,id_token,refresh_token}= tokens
            console.log(access_token)
           
            
            // on decode l'id token afin de recupere les infos user
            const decodedToken = jwt.decode(id_token);
            const { sub, given_name, family_name, email , picture } = decodedToken;

            // on verifie si le user existe deja
            const result = await pool.query(getUserByEmail,[email])
            const user_found = result.rows; //check if user exists


            if(user_found.length != 0 ){
                const user_id = user_found[0].user_id

                // Mettre à jour les tokens en base de données
                await pool.query(updateTokensQuery, [access_token, refresh_token, user_id]);

                const token = generateToken(user_id,given_name, family_name, email)

                return res.cookie("SessionToken" ,token,{
                    maxAge: maxAgeInMilliseconds,
                    httpOnly: true,
                })
                .status(200)
                .send("connexion reussie")
               
                } else{
                    const result = await pool.query(addUserRequest,[
                        given_name,
                        family_name,
                        email,
                        access_token,
                        refresh_token,
                        picture 

                    ]);
                    const user_id = result.rows[0].user_id;
                    const token = generateToken(user_id,given_name, family_name, email);
    
                    return res.cookie("SessionToken" ,token,{
                        maxAge: maxAgeInMilliseconds,
                        httpOnly: true,
                    })
                    .status(200)
                    .send("connexion reussie")
                }   
    
    
        }catch(err){
            console.log(err)
            res.status(500).send('err server')
        }
      
    
    }


    const getUserIdFromRefreshToken = async(token)=>{
        try{
            const query = 'select user_id from users where  refresh_token = $1'
            const result = await pool.query(query ,) [token]

            const data = result.rows[0].user_id
            return data
        }catch(err){
            console.log(token)
        }
    }

    /*const updateAccessTokenInDatabase = async(userId, newAccessToken)=>{
        try{
            const updateTokensQuery = 'UPDATE users SET access_token = $1 WHERE user_id = $2';
            await

        }catch(err){
            console.log(err)
        }
    }*/
















exports.Register = (req, res)=>{
    

}

exports.Login = (req , res , next)=>{


}



exports.Logout = (req, res)=>{
    return res.clearCookie('SessionToken').status(200).send("deconnexion reussie")

}




exports.refreshToken = async(req, res)=>{

}