const express = require('express');
const router = express.Router();
const logger = require('../../app/logger');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/admin/resume');
});

router.get('/resume', function(req, res) {
  res.render('admin/resume/index', {title : "admin"});
});

router.get('/service', function(req, res) {
  res.render('admin/service/index', {title : "service"});
});

router.get('/experience', function(req, res) {
  res.render('admin/experience/index', {title : "experience"});
});

router.get('/project', function(req, res) {
  res.render('admin/project/index', {title : "project"});
});

router.get('/mail', function(req, res) {
  res.render('admin/mail/index', {title : "mail"});
});


router.get('/project/edit', function(req, res){
   const projectId = req.query.id;
   const ProjectModel = require('../models/ProjectModel');

   if(!projectId) res.redirect('/project');

   ProjectModel.findById(projectId)

   .then((project)=>{
      res.render('admin/project/edit', {projectId: projectId});
   })

   .catch(error=>{
     logger.error(error.toString(), __filename);
     res.status(500).send();
   });

});

router.get('/expertise', function(req, res) {
  res.render('admin/expertise/index', {title : "project"});
});

router.get('/blog', function(req, res) {
  res.render('admin/blog/index', {title : "project"});
});


module.exports = router;
