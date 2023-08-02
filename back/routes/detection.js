const express = require("express")
const router = express.Router()

const {detectionTextOnFile} = require('../controllers/detection')


router.post('/detection' , detectionTextOnFile)

module.exports = router