const express = require('express');
const router = express.Router();

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

router.get('/expertise', function(req, res) {
  res.render('admin/expertise/index', {title : "project"});
});

router.get('/blog', function(req, res) {
  res.render('admin/blog/index', {title : "project"});
});


// Auth pages
const loginController = new (require('../auth/controllers/LoginController'));
const setupController = new (require('../auth/controllers/SetupController'));
const mailVerifyController = new (require('../auth/controllers/MailVerifyController'));

router.get('/auth/login', loginController.getLogin);
router.post('/auth/login', loginController.postLogin);

router.get('/auth/setup', setupController.getSetup);
router.post('/auth/setup', setupController.postSetup);

router.get('/auth/mailverify', mailVerifyController.getMailVerify);

router.post('/auth/otp/generate', mailVerifyController.otpGenerate);
router.post('/auth/otp/verify', mailVerifyController.otpVerify);

// /admin/auth/otp/generate

module.exports = router;
