const ExperienceModel = require('../../models/ExperienceModel');


async function deleteExperience(experience_id){
    await ExperienceModel.findByIdAndRemove(experience_id);

    return true;
}

module.exports = deleteExperience;