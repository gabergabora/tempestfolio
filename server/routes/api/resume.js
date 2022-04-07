const multer = require('multer');
const multerStorage = multer.memoryStorage();
const multerUpload = multer({storage: multerStorage, errorHandling: 'manual'});

const ResumeController = require('../../controllers/ResumeController');
const resumeController = new ResumeController;


function resumeRoute(router){
    router.get('/resume', resumeController.getResumes);
    router.get('/resume/:id', resumeController.getOneResume);
    router.post('/resume/', multerUpload.single('resume'), resumeController.uploadResume);
    router.put('/resume/:id/setactive', resumeController.setActiveResume);
    router.delete('/resume/:id', resumeController.deleteResume);
}


module.exports = resumeRoute