const ServiceModel = require('../../models/ServiceModel');


async function deleteService(service_id){

    await ServiceModel.findByIdAndRemove(service_id);

    return true;

}

module.exports = deleteService;