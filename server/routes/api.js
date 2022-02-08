const express = require('express');
const router = express.Router();
//multer
const multer = require('multer');

const multerStorage = multer.memoryStorage();
const multerUpload = multer({storage: multerStorage});

// controllers
const ResumeController = require('../controllers/ResumeController');
const resumeController = new ResumeController;

/* GET home page. */
router.get('/resume', resumeController.getResumes);
router.get('/resume/:id', resumeController.getOneResume);
router.post('/resume/', multerUpload.single('resume'), resumeController.uploadResume);
router.delete('/resume/:id', multerUpload.single('resume'), resumeController.deleteResume);

module.exports = router;
