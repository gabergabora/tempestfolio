const ResumeModel = require('../../models/ResumeNodel');

// If any mongo error catch error
async function findResumes(){
    let resumes = await ResumeModel.find();

    resumes = resumes.map(resume=>{
       delete resume._doc.file_id
       return resume;
    })
 
    return resumes;
}


module.exports = findResumes;
