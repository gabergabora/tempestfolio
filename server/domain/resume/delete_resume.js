const Imagekit = require('../../libs/imagekit/Imagekit');
const ResumeModel = require('../../models/ResumeNodel');

async function deleteResune(resume_id){

    if(!resume_id) throw new Error ("")
    // find resume in database
    let resume = await ResumeModel.findById(resume_id);

    if(!resume) return true;

    // get fileId
    let resumeFileId = resume.fileId;

    //delete from remote
    await Imagekit.deleteFile(resumeFileId);

    //delete from database
    await ResumeModel.findByIdAndDelete(resume_id);

    return true;
}


module.exports = deleteResune;