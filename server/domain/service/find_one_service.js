const ServiceModel = require('../../models/service');

 async function findOneService(service_id){
    if(!service_id)
        throw new Error("find_one_service requires param service_id");

    let services = await ServiceModel.findById(service_id);
    
    return services;
}

module.exports = findOneService;