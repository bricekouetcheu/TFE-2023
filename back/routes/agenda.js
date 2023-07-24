const express = require('express');
const router = express.Router()

const {getAllAgendas} = require('../controllers/agenda');
const {authMiddleware} = require('../middleweares/auth');

router.get('/agendas' , authMiddleware, getAllAgendas )

module.exports = router