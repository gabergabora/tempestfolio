class ProjectController {
   
    newProject = (req, res) => {
        let createNewProject = require('../domain/project/create_new_project.js');

        const projectData = req.body;
        const projectImages = req.files;

        if(!projectData && projectImages)
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

}



module.exports = ProjectController;