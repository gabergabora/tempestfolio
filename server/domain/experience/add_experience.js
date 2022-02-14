const Joi = require('joi');
const ExperienceModel = require('../../models/ExperienceModel');



async function addExperience(experience_data){
    const { icon, title, company, company_link, from, to, experience } = experience_data;

    //validate
    const schema = Joi.object({
        icon: Joi.string().required().trim(true),
        title: Joi.string().required().trim(true),
        company: Joi.string().required().trim(true),
        company_link: Joi.string().required().trim(true),
        from: Joi.string().required().trim(true),
        to: Joi.string().required().trim(true),
        experience: Joi.string().required().trim(true),
    })


    try{
        const value = await schema.validateAsync(experience_data);
    }
    catch(error){

      const {_original, details} = error;
      const errorMessage =  (details[0]['message']).replace(/\"/g, "");

      let errorObject = {};

      errorObject.status = false;
      errorObject.message = `parameter ${errorMessage}`;

      return errorObject;
    }
   
    const experienceObject = { icon, title, company, company_link, from, to, experience };

    const newExperience = new ExperienceModel(experienceObject);

    const experienceData = await newExperience.save();

    return {status:true, data:experienceData};
}


module.exports = addExperience;