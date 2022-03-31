const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/resume');
});

router.get('/resume', function(req, res, next) {
  res.render('admin/resume/index', {title : "admin"});
});

router.get('/service', function(req, res, next) {
  res.render('admin/service/index', {title : "service"});
});

router.get('/experience', function(req, res, next) {
  res.render('admin/experience/index', {title : "experience"});
});

router.get('/project', function(req, res, next) {
  res.render('admin/project/index', {title : "project"});
});


module.exports = router;
