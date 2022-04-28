const ServiceModel = require('../../models/ServiceModel');

 async function findOneService(service_id){
    return await ServiceModel.findById(service_id);
}

module.exports = findOneService;