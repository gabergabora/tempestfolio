const ResumeModel = require('../../models/ResumeNodel');

async function setResumeActive(resume_id){
    if(!resume_id) throw new Error("FindOneResume requires param resume_id");

     await ResumeModel.updateOne({active: true}, {active: false});

     let newupdate = await ResumeModel.findByIdAndUpdate(resume_id, {active: true}, {new: true});

     if(newupdate){
        return {_id, active, fileSize, url, fileExtension} = newupdate;
     }

     else return null;
}

module.exports = setResumeActive