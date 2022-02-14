const Joi = require('joi');
const ServiceModel = require('../../models/ServiceModel');

async function addService(service){
    const { icon, title, take } = service;

     //validate
     const schema = Joi.object({
        icon: Joi.string().required().trim(true),
        title: Joi.string().required().trim(true),
        take: Joi.string().required().trim(true),
    })

    try{
        const value = await schema.validateAsync(service);
    }
    catch(error){

      const {_original, details} = error;
      const errorMessage =  (details[0]['message']).replace(/\"/g, "");

      let errorObject = {};

      errorObject.status = false;
      errorObject.message = `parameter ${errorMessage}`;

      return errorObject;
    }

    const serviceObject = { icon, title, take };

    const newService = new ServiceModel(serviceObject);

    const serviceData = await newService.save();

    return {status:true, data:serviceData};
}


module.exports = addService;