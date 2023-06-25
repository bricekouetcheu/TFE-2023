const express = require('express')
const router = express.Router()
const {GetIfcProject} = require('../controllers/files');
const {GetIfcfiles} = require('../controllers/files');
const { authMiddleware } = require('../middleweares/auth');



router.get('/files/:project_id',authMiddleware,  GetIfcProject);
router.get('/files/:project_id/:fileName',authMiddleware, GetIfcfiles);


module.exports = router;

