const express = require('express');
const router = express.Router();
const {CreateProject} = require('../controllers/projects')
const {getAllProjects} = require('../controllers/projects')
const { ifcstorage } = require('../middleweares/multer-config');
const {DeleteProject} =  require('../controllers/projects')
const multer = require('multer');



router.post('/project',multer({ storage: ifcstorage}).array('ifc'), CreateProject);
router.get('/projects', getAllProjects)
router.delete('/projects/:project_id', DeleteProject)



module.exports = router;