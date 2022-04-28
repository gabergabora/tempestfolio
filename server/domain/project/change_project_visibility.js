const ProjectModel = require('../../models/ProjectModel');

async function changeProjectVisibility(project_id, visibility){
     return await ProjectModel.findByIdAndUpdate(project_id, {visibility: visibility}, {new: true});
}

module.exports = changeProjectVisibility