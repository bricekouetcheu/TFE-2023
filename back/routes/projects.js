const express = require('express');
const router = express.Router();
const {CreateProject} = require('../controllers/projects')
const {getAllProjects} = require('../controllers/projects')
const { ifcstorage } = require('../middleweares/multer-config');
const { authMiddleware } = require('../middleweares/auth');
const { checkAuthorization  } = require('../middleweares/auth');
const {DeleteProject} =  require('../controllers/projects')
const multer = require('multer');
const {getOneProject} =  require('../controllers/projects')



router.post('/project', authMiddleware, multer({ storage: ifcstorage}).array('ifc'), CreateProject);
router.get('/projects',authMiddleware,  getAllProjects)
router.get('/project/:project_id', checkAuthorization , getOneProject)
router.delete('/projects/:project_id',authMiddleware,  DeleteProject)



module.exports = router;