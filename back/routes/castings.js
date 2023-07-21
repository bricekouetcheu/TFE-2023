const express = require('express');
const router = express.Router();
const {CreateNewCasting} = require('../controllers/castings')
const {GetAllCastings} = require("../controllers/castings")
const {getOneCastingById} = require('../controllers/castings')
const {getTemplateData} = require('../controllers/castings')
const {UpdateStatus} = require('../controllers/castings')
const { checkAuthorization  } = require('../middleweares/auth');

router.post('/projects/:project_id/casting' , checkAuthorization , CreateNewCasting)
router.get('/projects/:project_id/castings' , checkAuthorization , GetAllCastings)
router.get('/projects/:project_id/casting/:casting_id',getOneCastingById)
router.get('/templateData/:casting_id' , getTemplateData)
router.put('/castings/:casting_id',UpdateStatus)


module.exports = router;
