const express = require('express');
const router = express.Router();
const {Register} = require('../controllers/auth')
const {Login} = require('../controllers/auth')


router.post('/register', Register);
router.post('/login', Login)

module.exports = router;
