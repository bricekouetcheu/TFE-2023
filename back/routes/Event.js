const express = require('express');
const router = express.Router()

const {createNewEvent } = require('../controllers/Event');
const {getAllEventFromCalendar} = require('../controllers/Event');
const {getFirstEventFromCalendar} = require('../controllers/Event');
const {authMiddleware} = require('../middleweares/auth');

/**
 * @swagger
 *
 * /event:
 *   post:
 *     summary: Créer un nouvel événement dans l'agenda.
 *     description: Crée un nouvel événement dans l'agenda de l'utilisateur authentifié.
 *     tags:
 *       - Événements
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Le titre de l'événement.
 *                 example: Réunion importante
 *               description:
 *                 type: string
 *                 description: La description de l'événement.
 *                 example: Réunion pour discuter des projets à venir.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de l'événement au format ISO 8601.
 *                 example: "2023-07-25T14:00:00Z"
 *     responses:
 *       201:
 *         description: Événement créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un message confirmant la création de l'événement.
 *                   example: Événement créé avec succès.
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
 *                   example: Titre de l'événement manquant.
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

 * /events/{agendaId}:
 *   get:
 *     summary: Récupérer tous les événements d'un agenda.
 *     description: Récupère tous les événements de l'agenda spécifié pour l'utilisateur authentifié.
 *     tags:
 *       - Évents
 *     parameters:
 *       - in: path
 *         name: agendaId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'agenda dont on veut récupérer les événements.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste d'événements récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
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

router.post('/event' , authMiddleware, createNewEvent )
router.get('/events/:agendaId' , authMiddleware, getAllEventFromCalendar)
router.get('/event/:agendaId/:project_id' , authMiddleware, getFirstEventFromCalendar)

module.exports = router