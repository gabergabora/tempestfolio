const multer = require('multer');
const multerStorage = multer.memoryStorage();
const multerUpload = multer({storage: multerStorage, errorHandling: 'manual'});


// Reading binaries
const projectImages = [
	{ name: 'imageHero', maxCount: 1 }, 
	{ name: 'project_img_1', maxCount: 1 },
	{ name: 'project_img_2', maxCount: 1 },
	{ name: 'project_img_3', maxCount: 1 },
];

//Service
const ProjectController = require('../../controllers/ProjectController');
const projectController = new ProjectController;

function projectRoute(router){
    router.get('/project/', projectController.getProjects);
    router.get('/project/:id', projectController.getSingleProject);
    router.post('/project/', multerUpload.fields(projectImages), projectController.newProject);
    router.put('/project/:id', multerUpload.fields(projectImages), projectController.editProject);
    router.put('/project/:id/setvisibility', projectController.updateVisibility);
    router.delete('/project/:id/', projectController.dropProject);
}

module.exports = projectRoute;
