
class ExpertiseController {
    getExpertises = (req, res) => {
        const findExpertise = require('../domain/expertise/find_expertise');

        findExpertise()
        .then(projects=>{
            return res.status(200).json({data:projects});
        })

        .catch(err=>{
            return res.status(500).json({message:"could not complete request"});
        });

    }



    addExpertise = (req, res) => {
        let addNewExpertise = require('../domain/expertise/add_new_expertise');

        const expertiseData = req.body;
        const expertiseImages = req.files;
        console.log(req.files);

       if(!(Object.keys(expertiseData))){
            return res.status(400).json({message: "no data sent"});
       }

        addNewExpertise({...expertiseData, ...expertiseImages})
        .then(expertise=>{
            if(!expertise.status)return res.status(400).json({message: expertise.message});

            return res.status(200).json({data: expertise.data});
        })
        .catch(error=>{
           // log error
           console.log(error);
           return res.status(500).json({message: "Could not complete request"});
         })
        
    }


    removeExpertise = (req, res) => {
        let deleteExpertise = require('../domain/expertise/delete_expertise');

        const expertiseID = req.params.id;
        
        if(!expertiseID) return res.status(400).json("no id sent");

        deleteExpertise(projectID)
        .then(status=>{ 
            if(!status) return res.status(400).json({message: "no project with id found"});

            return res.status(200).json({data: {}});
        })
        .catch(error=>{
            // log error
            return res.status(500).json({message: "could not complete request"});
        })
    }


}


module.exports = ExpertiseController;