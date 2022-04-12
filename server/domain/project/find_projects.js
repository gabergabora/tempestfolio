const paginate = require('../api/paginate');
const ProjectModel = require('../../models/ProjectModel');

async function findProjects(entries=null, pageIndex=null, filter={}){
   if(entries){
      entries;
      pageIndex = pageIndex || 1;

      let paginatedProjects = await paginate(ProjectModel, entries, pageIndex, filter);
      
      return paginatedProjects;
   }

   const projects = await ProjectModel.find({...filter});

   return projects;
}


module.exports = findProjects;
