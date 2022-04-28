const ResumeModel = require('../../models/ResumeNodel');

async function setResumeActive(resume_id){
     await ResumeModel.updateOne({active: true}, {active: false});

     let newupdate = await ResumeModel.findByIdAndUpdate(resume_id, {active: true}, {new: true});

    return newupdate;
}

module.exports = setResumeActive