const express = require('express');
const router = express.Router()

const {createNewEvent } = require('../controllers/Event');
const {authMiddleware} = require('../middleweares/auth');

router.post('/event' , authMiddleware, createNewEvent )

module.exports = router