const express = require('express');
const router = express.Router();
const {CreateNewCasting} = require('../controllers/castings')
const {GetAllCastings} = require("../controllers/castings")
const {getOneCastingById} = require('../controllers/castings')
const {getTemplateData} = require('../controllers/castings')
const {UpdateStatus} = require('../controllers/castings')
const { checkAuthorization  } = require('../middleweares/auth');



/**
 * @swagger
 * /users/{id}/projects:
 *   get:
 *     summary: Get all projects for a user
 *     description: Use this route to retrieve a list of all projects associated with a user ID. A valid token is required to access this endpoint.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *           example: 1234
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The project ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The project's name.
 *                         example: Project One
 *       '401':
 *         description: Unauthorized access, invalid or missing token
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error, failed to retrieve projects
 */

router.post('/projects/:project_id/casting' , checkAuthorization , CreateNewCasting)

/**
 * @swagger
 * path:
 *   /projects/{project_id}/castings:
 *     get:
 *       summary: Récupère tous les castings d'un projet spécifié
 *       tags: [Castings]
 *       parameters:
 *         - in: path
 *           name: project_id
 *           required: true
 *           description: L'ID du projet pour lequel récupérer les castings
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Liste des castings récupérée avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     casting_id:
 *                       type: string
 *                     role:
 *                       type: string
 *                     requirements:
 *                       type: string
 *         401:
 *           description: Non autorisé - l'utilisateur n'a pas les droits nécessaires
 *         404:
 *           description: Projet non trouvé
 *         500:
 *           description: Erreur serveur - impossible de récupérer les castings
 *       security:
 *         - bearerAuth: []
 */
router.get('/projects/:project_id/castings' , checkAuthorization , GetAllCastings)
router.get('/projects/:project_id/casting/:casting_id',getOneCastingById)
router.get('/templateData/:casting_id' , getTemplateData)
router.put('/castings/:casting_id',UpdateStatus)


module.exports = router;
