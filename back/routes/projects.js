const express = require('express');
const router = express.Router();
const {CreateProject} = require('../controllers/projects')
const {getAllProjects} = require('../controllers/projects')
const { ifcstorage } = require('../middleweares/multer-config');
const { authMiddleware } = require('../middleweares/auth');
const { checkAuthorization  } = require('../middleweares/auth');
const {DeleteProject} =  require('../controllers/projects')
const multer = require('multer');
const {getOneProject} =  require('../controllers/projects')


/**
 * @swagger
 *
 * /project:
 *   post:
 *     summary: Créer un nouveau projet.
 *     description: Crée un nouveau projet en utilisant des fichiers IFC fournis. L'utilisateur doit être authentifié et fournir un jeton d'accès.
 *     tags:
 *       - Projets
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en authentifiant un utilisateur.
 *       - in: formData
 *         name: ifc
 *         type: file
 *         required: true
 *         description: Un ou plusieurs fichiers IFC à associer au nouveau projet.
 *     responses:
 *       201:
 *         description: Projet créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant que le projet a été créé.
 *                   example: Projet créé avec succès.
 *       400:
 *         description: Paramètres de requête invalides fournis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message décrivant l'erreur survenue.
 *                   example: Fichiers IFC manquants.
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
 * /projects:
 *   get:
 *     summary: Obtenir la liste de tous les projets.
 *     description: Renvoie la liste de tous les projets associés à l'utilisateur authentifié.
 *     tags:
 *       - Projets
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des projets renvoyée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
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
 * /project/{project_id}:
 *   get:
 *     summary: Obtenir les détails d'un projet.
 *     description: Renvoie les détails du projet avec l'ID spécifié, sous réserve que l'utilisateur soit autorisé.
 *     tags:
 *       - Projets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du projet à récupérer.
 *     responses:
 *       200:
 *         description: Détails du projet renvoyés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
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
 *       403:
 *         description: L'utilisateur n'est pas autorisé à accéder au projet.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message indiquant que l'utilisateur n'a pas les autorisations requises pour accéder au projet.
 *                   example: Accès non autorisé au projet.
 */

/**
 * @swagger
 *
 * /projects/{project_id}:
 *   delete:
 *     summary: Supprimer un projet.
 *     description: Supprime le projet avec l'ID spécifié, sous réserve que l'utilisateur soit autorisé.
 *     tags:
 *       - Projets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du projet à supprimer.
 *     responses:
 *       200:
 *         description: Projet supprimé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant que le projet a été supprimé.
 *                   example: Projet supprimé avec succès.
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
 *       403:
 *         description: L'utilisateur n'est pas autorisé à supprimer le projet.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message indiquant que l'utilisateur n'a pas les autorisations requises pour supprimer le projet.
 *                   example: Accès non autorisé à la suppression du projet.
 */

router.post('/project', authMiddleware, multer({ storage: ifcstorage}).array('ifc'), CreateProject);
router.get('/projects',authMiddleware,  getAllProjects)
router.get('/project/:project_id', checkAuthorization , getOneProject)
router.delete('/projects/:project_id',authMiddleware,  DeleteProject)



module.exports = router;