const Joi = require('joi');
const ServiceModel = require('../../models/ServiceModel');

async function updateService(service_id, data){
    const disAllowedProperties = ["_id", "__v"];
    let service = await ServiceModel.findById(service_id);

    if (!service) return null;

    //validate
    const schema = Joi.object({
        icon: Joi.string().trim(true),
        title: Joi.string().trim(true),
        take: Joi.string().trim(true),
    })


    try{
        const value = await schema.validateAsync(data);
    }
    catch(error){

      const {_original, details} = error;
      const errorMessage =  (details[0]['message']).replace(/\"/g, "");

      let errorObject = {};

      errorObject.status = false;
      errorObject.message = `parameter ${errorMessage}`;

      // return object of status of false and error message
      return errorObject;
    }


    (Object.keys(service._doc)).forEach(property=>{
        if(!disAllowedProperties.includes(property)){
            if(data[property] != undefined){
                service[property] = (data[property]).trim();
            }
        }
    })

    let updatedService = await service.save({new: true});

    return {status:true, updatedData: updatedService};

}


module.exports = updateService;