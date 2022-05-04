const express = require('express');
const router = express.Router();
const logger = require('../../app/logger');

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    res.redirect('/admin/resume');
  }
  catch(error){
    next(error);
  }
});

router.get('/resume', function(req, res, next) {
  try{
    res.render('admin/resume/index', {title : "admin"});
  }
  catch(error){
    next(error);
  }
});

router.get('/service', function(req, res, next) {
  try{
    res.render('admin/service/index', {title : "service"});
  }
  catch(error){
    next(error);
  }
});

router.get('/experience', function(req, res, next) {
  try{
    res.render('admin/experience/index', {title : "experience"});
  }
  catch(error){
    next(error);
  }
});

router.get('/project', function(req, res, next) {
  try{
    res.render('admin/project/index', {title : "project"});
  }
  catch(error){
    next(error);
  }
});

router.get('/mail', function(req, res, next) {
  try{
    res.render('admin/mail/index', {title : "mail"});
  }
  catch(error){
    next(error);
  }
});

router.get('/editor', function(req, res, next) {
  try{
    res.render('admin/cke5', {title : "mail"});
  }
  catch(error){
    next(error);
  }
});


router.get('/project/edit', async function(req, res, next){
  try{
    const projectId = req.query.id;
    const ProjectModel = require('../models/ProjectModel');
 
    if(!projectId) res.redirect('/project');
 
    const project = await ProjectModel.findById(projectId);

    if(!project){
      let projectNotFoundError = new Error("Project Not Found");
          projectNotFoundError.status = 404;

      throw projectNotFoundError;
    }

    
    res.render('admin/project/edit', {projectId: projectId});

  }
  catch(error){
     next(error);
  };

});

router.get('/expertise', function(req, res, next) {
  res.render('admin/expertise/index', {title : "project"});
});

router.get('/blog', function(req, res, next) {
  res.render('admin/blog/index', {title : "project"});
});

router.get('/profile', function(req, res, next) {
  try{
    res.render('admin/profile/index', {title : "project"});
  }catch(error){
    next(error);
  }
});

module.exports = router;
