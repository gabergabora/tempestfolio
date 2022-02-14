const ExperienceModel = require('../../models/ExperienceModel');


async function deleteExperience(experience_id){

    if(!experience_id)
       throw new Error("DeleteService requires param experience_id");

    await ExperienceModel.findByIdAndRemove(experience_id);

    return true;

}

module.exports = deleteExperience;