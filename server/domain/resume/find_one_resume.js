const ResumeModel = require('../../models/ResumeNodel');

 async function findOneService(resume_id){
    return await ResumeModel.findById(resume_id);
}

module.exports = findOneService;