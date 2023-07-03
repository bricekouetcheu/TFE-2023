const express = require('express');
const router = express.Router();
const {CreateNewCasting} = require('../controllers/castings')
const {GetAllCastings} = require("../controllers/castings")
const {getOneCastingById} = require('../controllers/castings')
const {getTemplateData} = require('../controllers/castings')

router.post('/projects/:project_id/casting' , CreateNewCasting)
router.get('/projects/:project_id/castings' , GetAllCastings)
router.get('/projects/:project_id/casting/:casting_id',getOneCastingById)
router.get('/templateData/:casting_id' , getTemplateData)


module.exports = router;
