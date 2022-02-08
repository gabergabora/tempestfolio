const ResumeModel = require('../../models/ResumeNodel');

 async function findOneService(resume_id){
    if(!resume_id)
        throw new Error("FindOneResume requires param resume_id");

    let resume = await ResumeModel.findById(resume_id);
    
    return resume;
}

module.exports = findOneService;