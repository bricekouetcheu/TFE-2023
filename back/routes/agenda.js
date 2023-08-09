const express = require('express');
const router = express.Router()

const {getAllAgendas} = require('../controllers/agenda');
const {authMiddleware} = require('../middleweares/auth');

/**
 * @swagger
 *
 * /agendas:
 *   get:
 *     summary: Obtenir la liste de tous les agendas.
 *     description: Renvoie la liste de tous les agendas associés à l'utilisateur authentifié.
 *     tags:
 *       - Agendas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des agendas renvoyée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             
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

router.get('/agendas' , authMiddleware, getAllAgendas )

module.exports = router