const Imagekit = require('../../libs/imagekit/Imagekit');
const ExpertiseModel = require('../../models/ExpertiseModel');

async function deleteExpertise(expertise_id){
    let expertise = await ExpertiseModel.findById(expertise_id);

    if(!expertise) return {status: false};

    let expertiseIcon = expertise.icon;

    await Imagekit.deleteFile(expertiseIcon.fileId);

    //delete from database
    await ExpertiseModel.findByIdAndDelete(expertise_id);

    return {status: true};
}


module.exports = deleteExpertise
