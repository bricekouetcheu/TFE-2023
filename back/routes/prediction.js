const express = require('express');
const router = express.Router();

const {getPrediction} = require('../controllers/Prediction');


router.post('/prediction', getPrediction )

module.exports = router