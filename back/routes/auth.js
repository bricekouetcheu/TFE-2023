const express = require('express');
const router = express.Router();
const {Register} = require('../controllers/auth')
const {Login} = require('../controllers/auth')
const {Logout} = require('../controllers/auth')


router.post('/register', Register);
router.post('/login', Login)
router.get('/logout',Logout)

module.exports = router;
