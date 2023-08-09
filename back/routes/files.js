const express = require('express')
const router = express.Router()
const {GetIfcProject} = require('../controllers/files');
const {GetIfcfiles} = require('../controllers/files');
const { authMiddleware } = require('../middleweares/auth');



router.get('/files/:project_id',authMiddleware,  GetIfcProject);
router.get('/files/:project_id/:fileName',authMiddleware, GetIfcfiles);

/**
 * @swagger
 *
 * /files/{project_id}:
 *   get:
 *     summary: Obtenir la liste des fichiers IFC d'un projet.
 *     description: Récupère la liste des fichiers IFC associés au projet spécifié.
 *     tags:
 *       - IFC files
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du projet pour lequel obtenir la liste des fichiers IFC.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en s'authentifiant.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des fichiers IFC récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["file1.ifc", "file2.ifc"]
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
 * /files/{project_id}/{fileName}:
 *   get:
 *     summary: Télécharger un fichier IFC spécifique.
 *     description: Télécharge le fichier IFC spécifié associé au projet donné.
 *     tags:
 *       - IFC files
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du projet auquel appartient le fichier IFC.
 *       - in: path
 *         name: fileName
 *         schema:
 *           type: string
 *         required: true
 *         description: Le nom du fichier IFC à télécharger.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en s'authentifiant.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Fichier IFC téléchargé avec succès.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
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

