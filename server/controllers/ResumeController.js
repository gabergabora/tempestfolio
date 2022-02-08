const ApiController = require('./ApiController')

class ResumeController extends ApiController{
   
//   domainBasePath = Path2D.join(__dirname, '/../domain/resume');

  initController = (req, res) => {
    this.initRequest(req, res);
  }


  getResumes = (req, res) => {
      this.initController(req, res);

      let findResumes = require('../domain/resume/find_resumes');

      findResumes()

      .then(resumes => {
        return this.response.status(200).json({data: resumes});
      })

      .catch(error => {
        // Log error
        return this.response.status(500).json({message: "Could not complete request"});
      })
  }


  getOneResume = (req, res) => {
    this.initController(req, res);

    let findOneResume = require('../domain/resume/find_one_resume');
    
    let resumeID = this.reqParams['id'] || null;

    if(!resumeID) return this.response.status(500).json({message: "no resume id sent"});

    findOneResume(resumeID)

    .then(resume=>{
      if(!resume) return this.response.status(400).json({message: "no resume with id found"});
      return this.response.status(200).json({data: resume});

    })

    .catch(error => {
      // Log error
      return this.response.status(500).json({message: "Could not complete request"});
    })
  }


  uploadResume = (req, res) => {
    this.initController(req, res);

    let uploadResume = require('../domain/resume/upload_resume');

    let file = this.reqFile;

    if(!file) return this.response.status(400).json({message: "no file sent"});

    uploadResume(file)

    .then(resumeDetails=>{
      if(!resumeDetails.uploaded)
        return this.response.status(400).json({data: resumeDetails.error});

      return this.response.status(200).json({data: resumeDetails});
    })

    .catch(error => {
      // Log error
      return this.response.status(500).json({message: "Could not complete request"});
    })

  }


  deleteResune(){
    this.initController(req, res);

    let deleteResune = require('../domain/resume/delete_resume');

    let resumeID = this.reqParams['id'];

    if(!resumeID) return this.response.status(400).json({message: "no file sent"});

    deleteResune(resumeID)
    .then(status => {
        return this.response.status(200).json({data:[]});
    })
    .catch(error=>{return this.response.status(500).json({message: "could not complete request"})})
  }


}



module.exports = ResumeController;