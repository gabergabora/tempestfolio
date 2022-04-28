const ApiController = require('./ApiController');

class ExpertiseController extends ApiController{
    getExpertises = (req, res, next) => {
        const findExpertise = require('../domain/expertise/find_expertise');

        // check for pagination
        let entries  = req.query['entries'];
        let pageIndex  = req.query['index'];

        findExpertise(entries, pageIndex)
        .then(expertise=>{
            return res.status(200).json({data:expertise});
        })

        .catch(error=>{
            next(error);
        });

    }

    
    getSingleExpertises = (req, res, next) => {
        const findOneExpertise = require('../domain/expertise/find_one_expertise');
  
        let expertiseID = req.params['id'] || null;
  
        if(!expertiseID) return res.status(400).json("no id sent");

        findOneExpertise(expertiseID)
        .then(expertise=>{
            if(!expertise) return res.status(400).json("no expertise with given id found")
            return res.status(200).json({data:expertise});
        })

        .catch(error=>{
            next(error);
        });

    }


    addExpertise = (req, res, next) => {
        let addNewExpertise = require('../domain/expertise/add_new_expertise');

        const expertiseData = {};
        expertiseData.name = req.body.name;
        expertiseData.rating = req.body.rating;
        expertiseData.icon = req.file;

       if(!(Object.values(expertiseData))) return res.status(400).json({message: "no data sent"});

        addNewExpertise(expertiseData)
        .then(expertise=>{
            if(!expertise.status) return res.status(400).json({message: expertise.message});

            return res.status(200).json({data: expertise.data});
        })
        .catch(error=>{
            next(error);
         })
        
    }

    updateExpertise = (req, res, next) => {
        let updateExpertise = require('../domain/expertise/update_expertise');

        const expertiseID = req.params.id || null;

        if(!expertiseID) return res.status(400).json("no id sent");

        const expertiseData = {};
        expertiseData.name = req.body.name;
        expertiseData.rating = req.body.rating;
        expertiseData.icon = req.file;

       if(!expertiseID) return res.status(400).json("no id sent");
       if(!(Object.values(expertiseData))) return res.status(400).json({message: "no data sent"});

       updateExpertise(expertiseID, expertiseData)
        .then(expertise=>{
            if(!expertise.status) return res.status(400).json({message: expertise.message});

            return res.status(200).json({data: expertise.data});
        })
        .catch(error=>{
            next(error);
         })
        
    }


    removeExpertise = (req, res, next) => {
        let deleteExpertise = require('../domain/expertise/delete-expertise');

        const expertiseID = req.params.id || null;
        
        if(!expertiseID) return res.status(400).json("no id sent");

        deleteExpertise(expertiseID)
        .then(status=>{ 
            if(!status) return res.status(400).json({message: "no expertise with id found"});

            return res.status(200).json({data: {}});
        })
        .catch(error=>{
            next(error);
        })
    }


}


module.exports = ExpertiseController;