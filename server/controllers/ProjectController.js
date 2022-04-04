class ProjectController {
    getProjects = (req, res) => {
        const findProjects = require('../domain/project/find_projects');

        findProjects()
        .then(projects=>{
           return res.status(200).json({data:projects});
         })
  
        .catch(err=>{
           return res.status(500).json({message:"could not complete request"});
        });

    }

    getSingleProject = (req, res) => {
        const findOneProjects = require('../domain/project/find_one_project');

        const projectID = req.params.id || null;

        if(!projectID) return res.status(400).json({message: "no id sent"});

        findOneProjects(projectID)
        .then(project=>{
           if(!project) return res.status(400).json({message: "no project with id found"});
           
           return res.status(200).json({data:project});
         })
  
        .catch(err=>{
           return res.status(500).json({message:"could not complete request"});
        });

    }


    newProject = (req, res) => {
        let createNewProject = require('../domain/project/create_new_project.js');

        const projectData = req.body;
        const projectImages = req.files;

        if(!projectData && !projectImages)
           return res.status(400).json({message: "no data sent"});

        createNewProject({...projectData, ...projectImages})
        
        .then(project=>{
            if(!project.status)return res.status(400).json({message: project.message});

            return res.status(200).json({data: project.data});
        })
        .catch(error=>{
           // log error
           return res.status(500).json({message: "Could not complete request"});
         })

    }

    updateVisibility = (req, res) => {
        let changeProjectVisibility = require('../domain/project/change_project_visibility');

        const visibility = req.body['visibility'];
        const projectID = req.params.id;

        console.log(req.body)

        if(!projectID || visibility == undefined)
            return res.status(400).json({message: "project id and visibility are required"});


        changeProjectVisibility(projectID, visibility)
        .then(project=>{
            if(!project) return res.status(400).json({message: "no project with id found"});
    
            return res.status(200).json({data: project});
        })
        
        .catch(error=>{
          //log error
          return res.status(500).json({message:"could not complete request"});
        })

    }


    dropProject = (req, res) => {
        let deleteProject = require('../domain/project/delete_project');

        const projectID = req.params.id;
       
        if(!expertiseID) return res.status(400).json("no id sent");

        deleteProject(projectID)
        .then(status=>{ 
            if(!status) return res.status(400).json({message: "no project with id found"});

            return res.status(200).json({data: {}});
        })
        .catch(error=>{
            // log error
            console.log(error);
            return res.status(500).json({message: "could not complete request"});
        })
    }



}



module.exports = ProjectController;