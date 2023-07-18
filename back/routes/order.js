const express = require('express')
const router = express.Router()
const {AddNewOrder} = require('../controllers/orders')
const {getOneOrder} = require('../controllers/orders')

router.post('/order/:casting_id', AddNewOrder );
router.get('/order/:casting_id' , getOneOrder)

module.exports = router;