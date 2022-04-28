const router = (require('express')).Router();

// Auth pages
const loginController = new (require('../auth/controllers/LoginController'));
const setupController = new (require('../auth/controllers/SetupController'));
const mailVerifyController = new (require('../auth/controllers/MailVerifyController'));
const passwordResetController = new (require('../auth/controllers/PasswordResetController'));

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.get('/setup', setupController.getSetup);
router.post('/setup', setupController.postSetup);

router.get('/mailverify', mailVerifyController.getMailVerify);

router.post('/otp/generate', mailVerifyController.otpGenerate);
router.post('/otp/verify', mailVerifyController.otpVerify);

router.get('/passwordreset', passwordResetController.setupPasswordReset);
router.get('/passwordreset/:prid', passwordResetController.verifyPasswordResetLink);
router.post('/passwordreset', passwordResetController.postResetPassword);


module.exports = router;