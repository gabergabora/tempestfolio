const ApiController = require('./ApiController');

class ExpertiseController extends ApiController{
    getExpertises = (req, res) => {
        const findExpertise = require('../domain/expertise/find_expertise');

        // check for pagination
        let entries  = req.query['entries'];
        let pageIndex  = req.query['index'];

        console.log(req.query);

        findExpertise(entries, pageIndex)
        .then(expertise=>{
            return res.status(200).json({data:expertise});
        })

        .catch(error=>{
            this.logError(error);
            return res.status(500).json({message:"could not complete request"});
        });

    }

    getSingleExpertises = (req, res) => {
        const findOneExpertise = require('../domain/expertise/find_one_expertise');
  
        let expertiseID = req.params['id'] || null;
  
        if(!expertiseID) return res.status(400).json("no id sent");

        findOneExpertise(expertiseID)
        .then(expertise=>{
            if(!expertise) return res.status(400).json("no expertise with given id found")
            return res.status(200).json({data:expertise});
        })

        .catch(error=>{
            this.logError(error);
            return res.status(500).json({message:"could not complete request"});
        });

    }



    addExpertise = (req, res) => {
        let addNewExpertise = require('../domain/expertise/add_new_expertise');

        const expertiseData = {};
        expertiseData.name = req.body.name;
        expertiseData.rating = req.body.rating;
        expertiseData.icon = req.file;

       if(!(Object.keys(expertiseData))){
            return res.status(400).json({message: "no data sent"});
       }

        addNewExpertise(expertiseData)
        .then(expertise=>{
            if(!expertise.status)return res.status(400).json({message: expertise.message});

            return res.status(200).json({data: expertise.data});
        })
        .catch(error=>{
           this.logError(error);
           return res.status(500).json({message: "Could not complete request"});
         })
        
    }

    // updateExpertise = (req, res) => {
    //     let addNewExpertise = require('../domain/expertise/add_new_expertise');

    //     const expertiseData = {};
    //     expertiseData.name = req.body.name;
    //     expertiseData.rating = req.body.rating;
    //     expertiseData.icon = req.file;

    //    if(!(Object.keys(expertiseData))){
    //         return res.status(400).json({message: "no data sent"});
    //    }

    //     addNewExpertise(expertiseData)
    //     .then(expertise=>{
    //         if(!expertise.status)return res.status(400).json({message: expertise.message});

    //         return res.status(200).json({data: expertise.data});
    //     })
    //     .catch(error=>{
    //        // log error
    //        console.log(error);
    //        return res.status(500).json({message: "Could not complete request"});
    //      })
        
    // }


    removeExpertise = (req, res) => {
        let deleteExpertise = require('../domain/expertise/delete-expertise');

        const expertiseID = req.params.id;
        
        if(!expertiseID) return res.status(400).json("no id sent");

        deleteExpertise(expertiseID)
        .then(status=>{ 
            if(!status) return res.status(400).json({message: "no expertise with id found"});

            return res.status(200).json({data: {}});
        })
        .catch(error=>{
            this.logError(error);
            return res.status(500).json({message: "could not complete request"});
        })
    }


}


module.exports = ExpertiseController;