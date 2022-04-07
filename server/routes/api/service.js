//Service
const ServiceController = require('../../controllers/ServiceController');
const serviceController = new ServiceController;

function serviceRoute(router){
    router.get('/service', serviceController.getServices);
    router.get('/service/:id', serviceController.getSingleService);
    router.post('/service', serviceController.addService);
    router.put('/service/:id', serviceController.updateService);
    router.delete('/service/:id', serviceController.deleteService);
}

module.exports = serviceRoute;
