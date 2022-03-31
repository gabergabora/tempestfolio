const ApiController = require('./ApiController');
const logger = require('../../core/logger');

class ResumeController {

  getResumes = (req, res) => {
      let findResumes = require('../domain/resume/find_resumes');

      findResumes()

      .then(resumes => {
        return res.status(200).json({data: resumes});
      })

      .catch(error => {
        ResumeController.log(error);
        return res.status(500).json({message: "Could not complete request"});
      })
  }


  getOneResume = (req, res) => {

    let findOneResume = require('../domain/resume/find_one_resume');
    
    let resumeID = req.params['id'] || null;

    if(!resumeID) return res.status(500).json({message: "no resume id sent"});

    findOneResume(resumeID)

    .then(resume=>{
      if(!resume) return res.status(400).json({message: "no resume with id found"});
      return res.status(200).json({data: resume});

    })

    .catch(error => {
      ResumeController.log(error);
      return res.status(500).json({message: "Could not complete request"});
    })
  }


  uploadResume = (req, res) => {

    let uploadResume = require('../domain/resume/upload_resume');

    let file = req.file;

    if(!file) return res.status(400).json({message: "no file sent"});

    uploadResume(file)

    .then(resumeDetails=>{
      if(!resumeDetails.uploaded)
        return res.status(400).json({data: resumeDetails.error});

      return res.status(200).json({data: resumeDetails});
    })

    .catch(error => {
      ResumeController.log(error);
      return res.status(500).json({message: "Could not complete request"});
    })

  }


  setActiveResume = (req, res) => {

    let setResumeActive = require('../domain/resume/set_resume_active');
    
    let resumeID = req.params['id'] || null;

    if(!resumeID) return res.status(500).json({message: "no resume id sent"});

    setResumeActive(resumeID)

    .then(resume=>{
        if(!resume) return res.status(400).json({message: "no resume with id found"});

        return res.status(200).json({data: resume});
    })
    
    .catch(error=>{
      ResumeController.log(error);
      return res.status(500).json({message:"could not complete request"});
    })
  }

  deleteResume = (req, res) => {

    let deleteResune = require('../domain/resume/delete_resume');

    let resumeID = req.params['id'];

    if(!resumeID) return res.status(400).json({message: "no file sent"});

    deleteResune(resumeID)
    .then(status => {
        return res.status(200).json({data:{}});
    })
    .catch(error=>{
        ResumeController.log(error);
        return res.status(500).json({message: "could not complete request"})
      })
  }


  static log(info, level="error"){
		let message;

		if(typeof info == "object")
		  message = info.toString();
		else
		  message = info;

		logger.log({
			level: level,
			message: message,
			meta: {where: __filename, date: (new Date()).toLocaleString()}
		})
	}

}



module.exports = ResumeController;