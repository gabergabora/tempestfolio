const ServiceModel = require('../../models/ServiceModel');


async function deleteService(service_id){

    if(!service_id)
       throw new Error("DeleteService requires param service_id");

    const d = await ServiceModel.findByIdAndRemove(service_id);

    console.log(d);
    return true;

}

module.exports = deleteService;