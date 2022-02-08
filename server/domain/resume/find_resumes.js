const ResumeModel = require('../../models/ResumeNodel');

// If any mongo error catch error
async function findResumes(){
    const resumes = await ResumeModel.find();

    return resumes;
}


module.exports = findResumes;
