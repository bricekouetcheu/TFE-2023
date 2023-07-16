

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


