const express = require('express')
const router = express.Router()
const multer = require('multer')
const {AddNewOrder} = require('../controllers/orders')
const {getOneOrder} = require('../controllers/orders')
const { authMiddleware } = require('../middleweares/auth');

const upload = multer()


router.post('/order/:casting_id',authMiddleware, AddNewOrder );
router.get('/order/:casting_id' , authMiddleware, getOneOrder);

module.exports = router;