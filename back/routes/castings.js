const express = require('express');
const router = express.Router();
const {CreateNewCasting} = require('../controllers/castings')
const {GetAllCastings} = require("../controllers/castings")


router.post('/projects/:project_id/casting' , CreateNewCasting)
router.get('/projects/:project_id/casting' , GetAllCastings)


module.exports = router;
