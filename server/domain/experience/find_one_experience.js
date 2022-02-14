const ExperienceModel = require('../../models/ExperienceModel');

 async function findOneExperience(experience_id){
    if(!experience_id)
        throw new Error("find_one_service requires param experience_id");

    let services = await ExperienceModel.findById(experience_id);
    
    return services;
}

module.exports = findOneExperience;