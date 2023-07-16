const pool = require('../db.js');
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage')

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















exports.Register = (req, res)=>{
    const {name,surname,email, password,compagny}= req.body; // recover data send by the frontend


    try{
        pool.query(`select * from users where user_email =$1;`,[email])
        .then(result =>{
            const user_found = result.rows; //check if user exists
            if(user_found.length != 0 ){
                return res.status(404).json({
                    message:"Email already used",
                })

            }else{
                bcrypt.genSalt(saltRounds, (err , salt)=>{ //hash the password before save it into DB
                    bcrypt.hash(password,salt ,(err, hashed_password)=>{
                        if(err){
                            console.log(err)
                        }else{
                            const addUserRequest = 'INSERT INTO users (user_id,user_name,user_surname,user_email,user_password,user_compagny,role_id) values(DEFAULT,$1,$2,$3,$4,$5,2) RETURNING *';
                            pool.query(addUserRequest,[name,surname,email,hashed_password,compagny],(err , results)=>{ //save new user into DB
                                if(err){
                                    console.log(err);
                                }else{
                                    
                                    res.status(201).send({
                                       
                                        message:'sign up ok'
                                    })
                                }
                            })
                        }

                    })
                })

            }
        })

    }
    catch(err) {
        (err);
        res.status(500).send(
            {
                error : "Database error while registering new user" //Database connection error
            }
        )

    }

}

exports.Login = (req , res , next)=>{
    const {email , password} = req.body; // on recupere les valeurs envoyées par le front
    const hours = 12;
    const maxAgeInMilliseconds = hours * 60 * 60 * 1000;

    try{
         pool.query(`SELECT * FROM users WHERE user_email= $1;`, [email])
         .then( result=>{
            const user = result.rows;
            if(user.length === 0){// check if user is already in database
                console.log('pas encore de compte');
                return res.status(401).send({message: 'Vous\'avez pas encore de compte'});
            }
    
            else{
                
                const name = user[0].user_name;
                const surname = user[0].user_surname;
                const user_id= user[0].user_id
                bcrypt.compare(password , user[0].user_password) // check matching between password found and password sent
                .then(valid =>{
                    if(!valid){ 
                        console.log('incorrect password');
                        return res.status(401).json({message:'incorrect password'})
                    }else{ // password ok!!! send user

                        const token = jwt.sign({
                            user_id : user_id,
                            surname: surname,
                            name : name,
                            email: email,}, 
                            process.env.TOKEN_PASS,
                            { expiresIn: '24h'})

                        return res.cookie("accessToken" ,token,{
                            maxAge: maxAgeInMilliseconds,
                            httpOnly: true,
                        })
                        .status(200)
                        .send("connexion reussie")

                    }
                })
    
                .catch(error =>{
                    res.status(500).json( error )
                    console.log(error)
                }
                   
                )
                
    
            }

        })

        .catch(error =>  {
            console.log(error),
            res.status(500).json(error)

        })
            
      

    } catch (err) {
        console.log(err);
        res.status(500).json({
        error: "Database error occurred while signing in!", //Database connection error
        });
}

}



exports.Logout = (req, res)=>{
    return res.clearCookie('accessToken').status(200).send("deconnexion reussie")

}




exports.refreshToken = async(req, res)=>{

}