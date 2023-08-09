const express = require('express');
const router = express.Router();

const {getPrediction} = require('../controllers/Prediction');


router.post('/prediction', getPrediction )

/**
 * @swagger
 *
 * /prediction:
 *   post:
 *     summary: Effectuer une prédiction.
 *     description: Effectue une prédiction de la date de decoffrage de beton en utilisant les données fournies par l'utilisateur.
 *     tags:
 *       - Service Prédiction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   strengthClass:
 *                     type: number
 *                     description: La classe de résistance.
 *                   cementType:
 *                     type: number
 *                     description: Le type de ciment.
 *                   temperature_hist:
 *                     type: array
 *                     items:
 *                       type: number
 *                     description: L'historique de température.
 *                   time_hist:
 *                     type: array
 *                     items:
 *                       type: number
 *                     description: L'historique de temps.
 *                   t_cast:
 *                     type: number
 *                     description: Le temps de coulée.
 *                 example:
 *                   strengthClass: 20
 *                   cementType: 0.25
 *                   temperature_hist: [25, 30, 35]
 *                   time_hist: [0, 5, 10]
 *                   t_cast: 0
 *     responses:
 *       200:
 *         description: Prédiction effectuée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prediction:
 *                   type: number
 *                   description: La valeur prédite en fonction des données d'entrée.
 *       400:
 *         description: Données d'entrée manquantes ou incorrectes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message décrivant l'erreur survenue.
 *                   example: Données d'entrée manquantes ou incorrectes.
 *       500:
 *         description: Erreur lors de la prédiction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message indiquant qu'une erreur s'est produite lors de la prédiction.
 *                   example: Erreur lors de la prédiction.
 */

module.exports = router