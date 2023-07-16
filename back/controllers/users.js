const pool = require('../db.js');


exports.getProfile = async(req, res)=>{
    try{
        const user_id = req.user.user_id


        const getProfileQuery = ('select user_name, user_surname, user_email, user_picture from users where user_id = $1')
        const result = await pool.query(getProfileQuery,[user_id])
    
        const data = result.rows

        res
        .status(200)
        .send(data)

    }catch(err){
        res
        .status(500).send('erreur server')
        console.log(err)
    }
 

}


exports.checkAuth = async (req, res)=>{
    const user_id = req.user.user_id

    if(user_id){
       
        res.status(200).send('authentifié')
    }else{
        res.status(401).send("veuillez vous connecter")
    }
}