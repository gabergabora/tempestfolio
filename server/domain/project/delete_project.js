const Imagekit = require('../../libs/imagekit/Imagekit');
const ProjectModel = require('../../models/ProjectModel');

async function deleteProject(project_id){
   let project = await ProjectModel.findById(project_id);

   if(!project) return {status: false};

   let projectMedias = [project['imageHero'], ...project['imgs']];


    let deleteMedia = [];
    
    for(let i=0; i<projectMedias.length; i++){
        let mediaId = projectMedias['file_id']

        deleteMedia.push(Imagekit.deleteFile(mediaId))
    }

    //delete projects media database
    await Promise.all(deleteMedia);
    //delete from database
    await ProjectModel.findByIdAndDelete(project_id);

    return {status: true};
}


module.exports = deleteProject
