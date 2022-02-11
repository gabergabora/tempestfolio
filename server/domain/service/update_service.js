const ServiceModel = require('../../models/ServiceModel');

async function updateService(service_id, data){
    const disAllowedProperties = ["_id", "__v"];
    let service = await ServiceModel.findById(service_id);

    if (!service) return null;

    (Object.keys(service._doc)).forEach(property=>{
        if(!disAllowedProperties.includes(property)){
            if(data[property] != undefined){
                service[property] = data[property];
            }
        }
    })

    let updatedService = await service.save({new: true});

    return updatedService;
}


module.exports = updateService;