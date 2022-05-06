
const ApiController = require('./ApiController');

class ProjectController extends ApiController{
    getProjects = (req, res, next) => {
        const findProjects = require('../domain/project/find_projects');

        // check for pagination
        let entries  = req.query['entries'];
        let pageIndex  = req.query['index'];

        //support filter
        const visibility = req.query.visible;

        const filter = {};

        if(visibility){
            filter.visibility = true;
        }

        findProjects(entries, pageIndex, filter)
        
        .then(projects=>{
           return res.status(200).json({data:projects});
         })
  
        .catch(error=>{
           next(error);
        });

    }

    getSingleProject = (req, res, next) => {
        const findOneProjects = require('../domain/project/find_one_project');

        const projectID = req.params.id || null;

        if(!projectID) return res.status(400).json({message: "no id sent"});

        findOneProjects(projectID)
        .then(project=>{
           if(!project) return res.status(400).json({message: "no project with id found"});
           
           return res.status(200).json({data:project});
         })
  
        .catch(error=>{
            next(error);
        });

    }


    newProject = (req, res, next) => {
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
           next(error);
         })

    }


    editProject = (req, res, next) => {
        let editProject = require('../domain/project/edit_project');
        const projectID = req.params.id || null;
        const projectData = req.body;
        const projectImages = req.files;

        if(!projectID) return res.status(400).json({message: "project id is required"});

        editProject(projectID, {...projectData, ...projectImages})
        .then(project=>{
            if(!project.status)return res.status(400).json({message: project.message});

            return res.status(200).json({data: project.data});
        })
        .catch(error=>{
          next(error);
         })
    }


    updateVisibility = (req, res, next) => {
        let changeProjectVisibility = require('../domain/project/change_project_visibility');

        const projectID = req.params.id || null;
        const visibility = req.body['visibility'];

        if(!projectID || visibility == undefined)
            return res.status(400).json({message: "project id and visibility are required"});

        changeProjectVisibility(projectID, visibility)
        .then(project=>{
            if(!project) return res.status(400).json({message: "no project with id found"});
    
            return res.status(200).json({data: project});
        })
        .catch(error=>{
          next(error);
        })

    }


    dropProject = (req, res, next) => {
        let deleteProject = require('../domain/project/delete_project');

        const projectID = req.params.id || null;
       
        if(!projectID) return res.status(400).json("no id sent");

        deleteProject(projectID)
        .then(status=>{ 
            if(!status) return res.status(400).json({message: "no project with id found"});

            return res.status(200).json({data: {}});
        })
        .catch(error=>{
          next(error);
        })
    }

}



module.exports = ProjectController;