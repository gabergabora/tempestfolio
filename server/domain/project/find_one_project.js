const ProjectModel = require('../../models/ProjectModel');

async function findOneProjects(project_id){
   return await ProjectModel.findById(project_id);
}


module.exports = findOneProjects
