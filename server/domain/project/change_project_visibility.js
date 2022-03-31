const ProjectModel = require('../../models/ProjectModel');

async function changeProjectVisibility(project_id, visibility){

     console.log(visibility, typeof visibility)

     let newupdate = await ProjectModel.findByIdAndUpdate(project_id, {visibility: visibility}, {new: true});

     return newupdate;
}

module.exports = changeProjectVisibility