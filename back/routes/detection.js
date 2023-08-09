const express = require("express")
const router = express.Router()

const {detectionTextOnFile} = require('../controllers/detection')


router.post('/detection' , detectionTextOnFile)

/**
 * @swagger
 *
 * /detection:
 *   post:
 *     summary: Détecter le texte dans un fichier.
 *     description: Détecte le texte dans le fichier fourni par l'utilisateur. Nécessite un fichier à détecter.
 *     tags:
 *       - Service detection
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Le fichier dans lequel détecter le texte.
 *     responses:
 *       200:
 *         description: Texte détecté avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: Le texte détecté dans le fichier.
 *                 confidence:
 *                   type: number
 *                   description: La confiance de la détection du texte (facultatif).
 *       400:
 *         description: Fichier non fourni ou format non pris en charge.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message décrivant l'erreur survenue.
 *                   example: Fichier non fourni ou format non pris en charge.
 *       500:
 *         description: Erreur lors de la détection du texte.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Un message indiquant qu'une erreur s'est produite lors de la détection du texte.
 *                   example: Erreur lors de la détection du texte.
 */


module.exports = router