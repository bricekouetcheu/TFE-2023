const pool = require('../db.js');
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;



exports.Register = (req, res)=>{
    const {name,surname,email, password}= req.body; // recover data send by the frontend


    try{
        pool.query(`select * from users where email =$1;`,[email])
        .then(result =>{
            const user_found = result.rows; //check if user exists
            if(user_found.length != 0 ){
                return res.status(400).json({
                    message:"cet addresse email est deja utilisée.",
                })

            }else{
                bcrypt.genSalt(saltRounds, (err , salt)=>{ //hash the password before save it into DB
                    bcrypt.hash(password,salt ,(err, hashed_password)=>{
                        if(err){
                            console.log(err)
                        }else{
                            const addUserRequest = 'INSERT INTO users (user_id,name,surname,email,password,role_id) values(DEFAULT,$1,$2,$3,$4,2) RETURNING *';
                            pool.query(addUserRequest,[name,surname,email,hashed_password],(err , results)=>{ //save new user into DB
                                if(err){
                                    console.log(err);
                                }else{
                                    
                                    res.status(201).send({
                                       
                                        message:'Inscription reussie'
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

    try{
         pool.query(`SELECT * FROM users WHERE email= $1;`, [email])
         .then( result=>{
            const user = result.rows;
            if(user.length === 0){// check if user is already in database
                console.log('pas encore de compte');
                return res.status(401).send({message: 'Vous\'avez pas encore de compte'});
            }
    
            else{
                
                const name = user[0].name;
                const surname = user[0].surname;
                const user_id= user[0].user_id
                bcrypt.compare(password , user[0].password) // check matching between password found and password sent
                .then(valid =>{
                    if(!valid){ 
                        console.log('incorrect password');
                        return res.status(401).json({message:'incorrect password'})
                    }else{ // password ok!!! send user

                        const token = jwt.sign({
                            id : user_id}, 
                            process.env.TOKEN_PASS,
                            { expiresIn: '24h'})

                        return res.status(200).send({
                            id : user_id,
                            name : name,
                            surname: surname,
                            email: email,
                        accessToken: token})
                    }
                })
    
                .catch(error => res.status(500).json({ error }));
                
    
    
                
    
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
