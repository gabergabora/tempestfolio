const Joi = require('joi');
const ExperienceModel = require('../../models/ExperienceModel');

async function updateExperience(experience_id, data){
    const disAllowedProperties = ["_id", "__v"];
    let experience = await ExperienceModel.findById(experience_id);

    // No experience found
    if (!experience) return null;


    //validator schema
    const schema = Joi.object({
        icon: Joi.string().trim(true),
        title: Joi.string().trim(true),
        company: Joi.string().trim(true),
        company_link: Joi.string().trim(true),
        from: Joi.string().trim(true),
        to: Joi.string().trim(true),
        experience: Joi.string().trim(true),
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

    (Object.keys(experience._doc)).forEach(property=>{
        if(!disAllowedProperties.includes(property)){
            if(data[property] != undefined){
                experience[property] = (data[property]).trim();
            }
        }
    })

    let updatedExperience = await experience.save({new: true});

    return {status:true, updatedData: updatedExperience};
}


module.exports = updateExperience;