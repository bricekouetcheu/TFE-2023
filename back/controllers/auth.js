const pool = require('../db.js');
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

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