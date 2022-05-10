const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/ProjectModel');
const ExperienceModel = require('../models/ExperienceModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frontpage/index', { title: 'Express' });
});

// project
router.get('/project/:id', async function(req, res, next) {
  try{
    // Prepare 404 error ahead of time. oh how sweet!
    const error = new Error();
          error.status = 404;
          error.message = "Not Found";

    const project = await ProjectModel.findById(req.params['id']);

    if(!project) throw error;

    res.render('frontpage/project', { project: project });

  }catch(error){
    next(error);
  }
});


// experience
router.get('/experience/:id', async function(req, res, next) {
  try{
    // Prepare 404 error ahead of time. oh how sweet!
    const error = new Error();
          error.status = 404;
          error.message = "Not Found";

    const experience = await ExperienceModel.findById(req.params['id']);
    console.log(experience);

    if(!experience) throw error;

    res.render('frontpage/experience', { experience: experience });

  }catch(error){
    next(error);
  }
});

module.exports = router;
