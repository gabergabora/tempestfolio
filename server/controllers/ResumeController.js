const ApiController = require('./ApiController');

class ResumeController extends ApiController{

  getResumes = (req, res, next) => {
      let findResumes = require('../domain/resume/find_resumes');

      findResumes()
      .then(resumes => {
        return res.status(200).json({data: resumes});
      })
      .catch(error => {
        next(error);
      })
  }


  getOneResume = (req, res, next) => {

    let findOneResume = require('../domain/resume/find_one_resume');
    
    let resumeID = req.params['id'] || null;

    if(!resumeID) return res.status(500).json({message: "no resume id sent"});

    findOneResume(resumeID)
    .then(resume=>{
      if(!resume) return res.status(400).json({message: "no resume with id found"});
      return res.status(200).json({data: resume});
    })
    .catch(error=>{
      next(error);
    })
  }


  uploadResume = (req, res, next) => {

    let uploadResume = require('../domain/resume/upload_resume');

    let file = req.file;

    if(!file) return res.status(400).json({message: "no file sent"});

    uploadResume(file)

    .then(resumeDetails=>{
      if(!resumeDetails.uploaded)
        return res.status(400).json({message: resumeDetails.error});

      return res.status(200).json({data: resumeDetails});
    })

    .catch(error => {
      next(error);
    })

  }


  setActiveResume = (req, res, next) => {

    let setResumeActive = require('../domain/resume/set_resume_active');
    
    let resumeID = req.params['id'] || null;

    if(!resumeID) return res.status(500).json({message: "no resume id sent"});

    setResumeActive(resumeID)
    .then(resume=>{
        if(!resume) return res.status(400).json({message: "no resume with id found"});

        return res.status(200).json({data: resume});
    })
    .catch(error=>{
      next(error);
    })
  }

  deleteResume = (req, res, next) => {

    let deleteResune = require('../domain/resume/delete_resume');

    let resumeID = req.params['id'];

    if(!resumeID) return res.status(400).json({message: "no file sent"});

    deleteResune(resumeID)
    .then(status => {
        return res.status(200).json({data:{}});
    })
    .catch(error=>{
      next(error);
    })
  }

}



module.exports = ResumeController;