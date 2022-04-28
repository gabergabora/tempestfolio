//Service
const ExperienceController = require('../../controllers/ExperienceController');
const experienceController = new ExperienceController;

function experienceRoute(router){
    router.get('/experience', experienceController.getExperiences);
    router.get('/experience/:id', experienceController.getSingleExperience);
    router.post('/experience', experienceController.addExperience);
    router.put('/experience/:id', experienceController.updateExperience);
    router.delete('/experience/:id', experienceController.deleteExperience);
}

module.exports = experienceRoute;
