const ExpertiseModel = require('../../models/ExpertiseModel');


async function findExpertise(){
   let projects = await ExpertiseModel.find({}, "");

   projects = projects.map(project=>{
      delete project._doc.icon.file_id
      return project;
   })

   return projects;
}


module.exports = findExpertise
