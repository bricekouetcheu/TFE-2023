const express = require('express')
const router = express.Router()
const multer = require('multer')
const {AddNewOrder} = require('../controllers/orders')
const {getOneOrder} = require('../controllers/orders')
const { authMiddleware } = require('../middleweares/auth');

const upload = multer()


router.post('/order/:casting_id',authMiddleware, AddNewOrder );
router.get('/order/:casting_id' , authMiddleware, getOneOrder);

/**
 * @swagger
 *
 * /order/{casting_id}:
 *   post:
 *     summary: Ajouter une nouvelle commande.
 *     description: Ajoute une nouvelle commande pour le casting spécifié.
 *     tags:
 *       - orders
 *     parameters:
 *       - in: path
 *         name: casting_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du casting pour lequel ajouter la commande.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Un jeton d'accès obtenu en s'authentifiant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ... (Ajoutez les propriétés requises pour la commande)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Commande ajoutée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant que la commande a été ajoutée.
 *                   example: Commande ajoutée avec succès.
 *       400:
 *         description: Paramètres de demande invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message décrivant l'erreur survenue.
 *                   example: Paramètres de demande invalides.
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
 * /orders/{casting_id}:
 *   get:
 *     summary: Obtenir une commande spécifique.
 *     description: Récupère les détails d'une commande spécifique pour le casting donné.
 *     tags:
 *       -  orders
 *     parameters:
 *       - in: path
 *         name: casting_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du casting pour lequel récupérer la commande.
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
 *         description: Détails de la commande récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // ... (Ajoutez les propriétés de la commande récupérée)
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