const pool = require('../db.js');

const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next)=> {
  const token = req.cookies.SessionToken; // on recupere le token



  try {
    if (!token) throw new Error('No token provided');

    const decodedToken = jwt.verify(token, process.env.TOKEN_PASS); // Vérification et décodage du token
    req.user = decodedToken; // Ajout des informations de l'utilisateur au corps de la requête
   
    next(); // Poursuite du traitement de la requête
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' }); // Gestion de l'erreur d'authentification
  }
}


exports.checkAuthorization = async(req, res, next)=>{
  const token = req.cookies.SessionToken;
   try{
    if (!token) throw new Error('No token provided');
    
    const decodedToken = jwt.verify(token, process.env.TOKEN_PASS); // Vérification et décodage du token
    req.user = decodedToken;
    const user_id = req.user.user_id

    const project_id = req.params.project_id
  
    const query = 'SELECT EXISTS (SELECT 1 FROM projects WHERE project_id = $1 AND owner_id = $2) AS is_owner;';
    const result = pool.query(query,[project_id, user_id])

    if(result.rows[0].is_owner){
      next();
    }else{
      return res.status(403).send("vous n'avez pas acces a ce projet")
    }

   }catch(err){
    consolelog(err)   }
 


}
