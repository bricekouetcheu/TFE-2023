const express = require('express')
const router = express.Router()
const {AddNewOrder} = require('../controllers/orders')

router.post('/orders/:casting_id', AddNewOrder );

module.exports = router;