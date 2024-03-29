/*const { verify } = require("jsonwebtoken");

exports.validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, process.env.TOKEN_PASS);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};*/


const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next)=> {
  const token = req.cookies.token || ''; // Récupération du token dans les cookies

  try {
    if (!token) throw new Error('No token provided');

    const decodedToken = jwt.verify(token, 'my-secret-key'); // Vérification et décodage du token
    req.user = decodedToken; // Ajout des informations de l'utilisateur au corps de la requête
    next(); // Poursuite du traitement de la requête
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' }); // Gestion de l'erreur d'authentification
  }
}


