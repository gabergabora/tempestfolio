const ExpertiseModel = require('../../models/ExpertiseModel');


async function findExpertise(){
   const projects = await ExpertiseModel.find();

   return projects;
}


module.exports = findExpertise
