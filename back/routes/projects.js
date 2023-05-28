const express = require('express');
const router = express.Router();
const {CreateProject} = require('../controllers/projects')
const { ifcstorage } = require('../middleweares/multer-config');
const multer = require('multer');



router.post('/project',multer({ storage: ifcstorage}).array('ifc'), CreateProject);


module.exports = router;