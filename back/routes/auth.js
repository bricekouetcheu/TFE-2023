const express = require('express');
const router = express.Router();
const {Register} = require('../controllers/auth')
const {Login} = require('../controllers/auth')
const {Logout} = require('../controllers/auth')
const {googleLogin } = require('../controllers/auth') 

/**
 * @swagger
 *
 * /logout:
 *   get:
 *     summary: Se déconnecter de l'application.
 *     description: Déconnecte l'utilisateur actuellement authentifié de l'application.
 *     tags:
 *       - Authentification
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur déconnecté avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant que l'utilisateur a été déconnecté.
 *                   example: Utilisateur déconnecté avec succès.
 *       401:
 *         description: Le jeton d'accès est manquant ou invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message indiquant que l'utilisateur n'est pas autorisé à effectuer l'action demandée.
 *                   example: Jeton d'accès invalide.

 * /login/google:
 *   post:
 *     summary: Se connecter avec un compte Google.
 *     description: Connecte l'utilisateur à l'application en utilisant un compte Google.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_token:
 *                 type: string
 *                 description: Le jeton d'identification Google obtenu lors de la connexion.
 *                 example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjMz..."
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant que l'utilisateur a été connecté.
 *                   example: Utilisateur connecté avec succès.
 *                 access_token:
 *                   type: string
 *                   description: Le jeton d'accès généré pour l'utilisateur.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Paramètres de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message décrivant l'erreur survenue.
 *                   example: Jeton d'identification Google invalide.
 *       401:
 *         description: Échec de l'authentification avec le compte Google.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message indiquant que l'utilisateur n'est pas autorisé à effectuer l'action demandée.
 *                   example: Échec de l'authentification avec le compte Google.
 */




router.get('/logout',Logout)
router.post('/login/google' , googleLogin )

module.exports = router;
