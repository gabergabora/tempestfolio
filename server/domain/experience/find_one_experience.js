const ExperienceModel = require('../../models/ExperienceModel');

 async function findOneExperience(experience_id){
    return await ExperienceModel.findById(experience_id);
}

module.exports = findOneExperience;