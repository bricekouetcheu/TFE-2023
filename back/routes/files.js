const express = require('express')
const router = express.Router()
const {GetIfcProject} = require('../controllers/files');
const {GetIfcfiles} = require('../controllers/files');
const { authMiddleware } = require('../middleweares/auth');



router.get('/files/:project_id',  GetIfcProject);
router.get('/files/:project_id/:fileName', GetIfcfiles);


module.exports = router;

