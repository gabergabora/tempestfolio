const ProjectModel = require('../../models/ProjectModel');

async function findProjects(){
   const projects = await ProjectModel.find();

   return projects;
}


module.exports = findProjects
