const Imagekit = require('../../libs/imagekit/Imagekit');
const ExpertiseModel = require('../../models/ExpertiseModel');

async function deleteExpertise(expertise_id){
    if(!expertise_id)
        throw new Error("delete_expertise requires param project_id");

    let expertise = await ExpertiseModel.findById(expertise_id);

    if(!expertise) return {status: false};

    let projectMedia = expertise.icon;

    await Imagekit.deleteFile(projectMedia.fileId);

    //delete from database
    await ProjectModel.findByIdAndDelete(project_id);

    return {status: true};
}


module.exports = deleteExpertise
