const express = require('express');
const router = express.Router()

const {createNewEvent } = require('../controllers/Event');
const {getAllEventFromCalendar} = require('../controllers/Event');
const {authMiddleware} = require('../middleweares/auth');

router.post('/event' , authMiddleware, createNewEvent )
router.get('/events/:agendaId' , authMiddleware, getAllEventFromCalendar)

module.exports = router