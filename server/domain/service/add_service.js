const ServiceModel = require('../../models/ServiceModel');

async function addService(service){
    const { icon, title, take } = service;

    //validate
    // switch to mongodb validation
    if(!icon || !title || !take){
        let errorObject = new Object;
        errorObject.status = false;
        errorObject.message = "icon, title and take are required";

        return (errObject);
    }

    const serviceObject = { icon, title, take };

    const newService = new ServiceModel(serviceObject);

    const serviceData = await newService.save();

    return {status:true, data:serviceData};
}


module.exports = addService;