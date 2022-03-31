const ProjectModel = require('../../models/ProjectModel');

async function findOneProjects(project_id){
   if(!project_id)
       throw new Error("find_one_service requires param project_id");

   let project = await ProjectModel.findById(project_id);

   return project;
}


module.exports = findOneProjects
