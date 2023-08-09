const express = require('express');
const router = express.Router();
const {CreateNewCasting} = require('../controllers/castings')
const {GetAllCastings} = require("../controllers/castings")
const {getOneCastingById} = require('../controllers/castings')
const {getTemplateData} = require('../controllers/castings')
const {UpdateStatus} = require('../controllers/castings')
const { checkAuthorization  } = require('../middleweares/auth');



router.post('/projects/:project_id/casting' , checkAuthorization , CreateNewCasting)
router.get('/projects/:project_id/castings' , checkAuthorization , GetAllCastings)
router.get('/projects/:project_id/casting/:casting_id',getOneCastingById)
router.get('/templateData/:casting_id' , getTemplateData)
router.put('/castings/:casting_id',UpdateStatus)

/**
 * @swagger
 *
 * /projects/{project_id}/casting:
 *   post:
 *     summary: Créer un nouveau casting pour un projet.
 *     description: Crée un nouveau casting pour le projet avec l'ID spécifié. Nécessite un jeton d'accès valide.
 *     tags:
 *       - Castings
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du projet pour lequel créer un casting.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en authentifiant un utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               casting_description:
 *                 type: string
 *                 description: La description du casting.
 *                 example: Casting pour le projet XYZ.
 *               casting_volume:
 *                 type: number
 *                 description: Le volume du casting.
 *                 example: 10.5
 *               template_id:
 *                 type: integer
 *                 description: L'ID du modèle de casting associé.
 *                 example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Casting créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant que le casting a été créé.
 *                   example: Casting créé avec succès.
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
 *                   example: Description du casting manquante.
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

 * /projects/{project_id}/castings:
 *   get:
 *     summary: Récupérer tous les castings d'un projet.
 *     description: Récupère tous les castings du projet spécifié pour l'utilisateur authentifié. Nécessite un jeton d'accès valide.
 *     tags:
 *       - Castings
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du projet dont on veut récupérer les castings.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en authentifiant un utilisateur.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de castings récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Casting'
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
 * 
 * /projects/{project_id}/casting/{casting_id}:
 *   get:
 *     summary: Récupérer un casting spécifique d'un projet.
 *     description: Récupère un casting spécifique du projet pour l'utilisateur authentifié. Nécessite un jeton d'accès valide.
 *     tags:
 *       - Castings
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du projet auquel appartient le casting.
 *       - in: path
 *         name: casting_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du casting à récupérer.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en authentifiant un utilisateur.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Casting récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Casting'
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
 */

/**
 * @swagger
 *
 * /templateData/{casting_id}:
 *   get:
 *     summary: Récupérer les données de modèle associées à un casting.
 *     description: Récupère les données de modèle associées au casting spécifié pour l'utilisateur authentifié. Nécessite un jeton d'accès valide.
 *     tags:
 *       - Castings
 *     parameters:
 *       - in: path
 *         name: casting_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du casting dont on veut récupérer les données de modèle.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en authentifiant un utilisateur.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Données de modèle récupérées avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemplateData'
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
 *
 * /castings/{casting_id}:
 *   put:
 *     summary: Mettre à jour le statut d'un casting.
 *     description: Met à jour le statut du casting spécifié pour l'utilisateur authentifié. Nécessite un jeton d'accès valide.
 *     tags:
 *       - Castings
 *     parameters:
 *       - in: path
 *         name: casting_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du casting à mettre à jour.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en authentifiant un utilisateur.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Statut du casting mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant que le statut du casting a été mis à jour.
 *                   example: Statut du casting mis à jour avec succès.
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
 */
module.exports = router;
