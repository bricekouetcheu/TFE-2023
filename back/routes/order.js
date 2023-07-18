const express = require('express')
const router = express.Router()
const {AddNewOrder} = require('../controllers/orders')
const {getOneOrder} = require('../controllers/orders')
const { authMiddleware } = require('../middleweares/auth');


router.post('/order/:casting_id',authMiddleware, AddNewOrder );
router.get('/order/:casting_id' , authMiddleware, getOneOrder);

module.exports = router;