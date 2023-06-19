const express = require('express');
const router = express.Router();
const {CreateProject} = require('../controllers/projects')
const {getAllProjects} = require('../controllers/projects')
const { ifcstorage } = require('../middleweares/multer-config');
const { authMiddleware } = require('../middleweares/auth');
const {DeleteProject} =  require('../controllers/projects')
const multer = require('multer');



router.post('/project',authMiddleware, multer({ storage: ifcstorage}).array('ifc'), CreateProject);
router.get('/projects',authMiddleware,  getAllProjects)
router.delete('/projects/:project_id',authMiddleware,  DeleteProject)



module.exports = router;