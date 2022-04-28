const ApiController = require('./ApiController');


class ServiceController extends ApiController{
   getServices = (req, res, next) => {
      const findServices = require('../domain/service/find_services');

      // check for pagination
      let entries  = req.query['entries'];
      let pageIndex  = req.query['index'];

      //support filter
      const visibility = req.query.visible;

      const filter = {};

      if(visibility){
          filter.visibility = true;
      }

      findServices(entries, pageIndex, filter)
      .then(services=>{
         return res.status(200).json({data:services});
      })
      .catch(error=>{
        next(error);
      });

   }


   getSingleService = (req, res, next) => {
      const findOneService = require('../domain/service/find_one_service');

      let serviceID = req.params['id'] || null;

      if(!serviceID) return res.status(400).json("no id sent");

      findOneService(serviceID)
      .then(service=>{
         if(!service){
            let errorMessage = "no service with the id found";
            return res.status(400).json({message: errorMessage});
         }
         return res.status(200).json({data:service});
      })
      .catch(error=>{
         next(error);
      });

   }


   addService = (req, res, next) => {
      const addService = require('../domain/service/add_service');
      
      let service = req.body;

      //check if req data is empty
      if (!(Object.values(service)).length) return res.status(400).json({message: 'no data sent' });


      addService(service)
      .then(service=>{
         if(!service.status)
            return res.status(400).json({message:service.message});

         return res.status(200).json({data:service.data}) 
      })
      .catch(error => {
         next(error);
      })

   }

   updateService = (req, res, next) => {
        const updateService = require('../domain/service/update_service');
        
        let serviceID = req.params['id'];
        let data = req.body;

        if(!serviceID) return res.status(400).json("no id sent");
        if(!(Object.values(data)).length) return res.status(400).json("no data sent");

        updateService(serviceID, data)
        .then(service=>{
            if(!service) return res.status(400).json({message: "no service with id found"});
            if(!service.status) return res.status(400).json({message: service.message});

            return res.status(200).json({data:service.updatedData});
        })
        .catch(error=>{
           next(error);
        })

   }

   deleteService = (req, res, next) =>{
      const deleteService = require('../domain/service/delete_service');

      let serviceID = req.params['id'] || null;

      if(!serviceID) return res.status(400).json({message:"no resume id sent"});

      deleteService(serviceID)
      .then(deleted=> { return res.status(200).json({data:{}}) })

      .catch(error=> { 
        next(error);
      })
   }

}


module.exports = ServiceController;