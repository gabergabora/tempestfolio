const ExpertiseModel = require('../../models/ExpertiseModel');


 async function findOneExpertise(expertise_id){
    return await ExpertiseModel.findById(expertise_id);
}

module.exports = findOneExpertise;