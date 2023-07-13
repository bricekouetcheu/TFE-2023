const express = require('express');
const router = express.Router();
const {getProfile} = require('../controllers/users')
const {checkAuth} = require('../controllers/users')
const {authMiddleware } = require('../middleweares/auth')

router.get('/profile', authMiddleware, getProfile )
router.get('/auth', authMiddleware, checkAuth )

module.exports = router