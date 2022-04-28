const ApiController = require('./ApiController');

class ExperienceController extends ApiController  {
   getExperiences = (req, res, next) => {
      const findExperiences = require('../domain/experience/find_experiences');

      // check for pagination
      let entries  = req.query['entries'];
      let pageIndex  = req.query['index'];

      findExperiences(entries, pageIndex)
      .then(experiences=>{
         return res.status(200).json({data:experiences});
      })
      .catch(error=>{
         next(error);
      });

   }


   getSingleExperience = (req, res, next) => {
      const findOneExperience = require('../domain/experience/find_one_experience');

      let ExperinceID = req.params['id'] || null;

      if(!ExperinceID) return res.status(400).json("no id sent");

      findOneExperience(ExperinceID)
      .then(experience=>{
         if(!experience){
            let errorMessage = "no experience with the id found";
            return res.status(400).json({message: errorMessage});
         }
         return res.status(200).json({data:experience});
      })
      .catch(error=>{
         next(error);
      });

   }


   addExperience = (req, res, next) => {
      const addExperience = require('../domain/experience/add_experience');

      //check if req data is empty
      if (!(Object.values(req.body)).length)
            return res.status(404).json({message: 'empty request data' });
   
         let experience = req.body;

         addExperience(experience)
         .then(experience=>{
            if(!experience.status)
               return res.status(400).json({message:experience.message});

            return res.status(200).json({data:experience.data}) 
         })
         .catch(error => {
           next(error);
        })

   }

   updateExperience = (req, res, next) => {
        const updateExperience = require('../domain/experience/update_experience');
        
        let experienceID = req.params['id'] || null;
        let data = req.body;

        if(!experienceID) return res.status(400).json("no id sent");
        if(!(Object.values(data)).length) return res.status(400).json("no data sent");

        updateExperience(experienceID, data)

        .then(experience=>{
            if(!experience) return res.status(400).json({message: "no experience with id found"});
            if(!experience.status) return res.status(400).json({message: experience.message});

            return res.status(200).json({data:experience.updatedData});
        })

        .catch(error=>{
           next(error);
        })

   }

   deleteExperience = (req, res, next) =>{
      const deleteExperience = require('../domain/experience/delete_experience');

      let experienceID = req.params['id'] || null;

      if(!experienceID) return res.status(400).json({message:"no resume id sent"});

      deleteExperience(experienceID)
      .then(deleted=> { return res.status(200).json({data:{}}) })
      .catch(error=> { 
         next(error);
      })
   }

}


module.exports = ExperienceController;