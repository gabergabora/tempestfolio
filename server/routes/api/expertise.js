const multer = require('multer');
const multerStorage = multer.memoryStorage();
const multerUpload = multer({storage: multerStorage});

//Service
const ExpertiseController = require('../../controllers/ExpertiseController');
const expertiseController = new ExpertiseController;

function expertiseRoute(router){
    router.get('/expertise/', expertiseController.getExpertises);
    router.get('/expertise/:id', expertiseController.getSingleExpertises);
    router.post('/expertise/', multerUpload.single('icon'), expertiseController.addExpertise);
    router.put('/expertise/:id', multerUpload.single('icon'), expertiseController.updateExpertise);
    router.delete('/expertise/:id', expertiseController.removeExpertise);
    
}

module.exports = expertiseRoute;
