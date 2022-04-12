const ApiController = require('./ApiController');


class ServiceController extends ApiController{
   getServices = (req, res) => {
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
        this.logError(error);
        return res.status(500).json({message:"could not complete request"});
      });

   }


   getSingleService = (req, res) => {
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
        this.logError(error);
         return res.status(500).json({message:"could not complete request"});
      });

   }


   addService = (req, res) => {
      const addService = require('../domain/service/add_service');
      console.log(req.body)
      //check if req data is empty
      if (!Object.keys(req.body).length)
            return res.status(404).json({message: 'empty request data' });
   
         let service = req.body;

         addService(service)
         
         .then(service=>{
            if(!service.status)
               return res.status(400).json({message:service.message});

            return res.status(200).json({data:service.data}) 
         })

         .catch(error => {
            this.logError(error);
            return res.status(500).json({message:"could not complete request"});
        })

   }

   updateService = (req, res) => {
        const updateService = require('../domain/service/update_service');
        
        let serviceID = req.params['id'];
        let data = req.body;

        if(!(Object.values(data)).length) return res.status(400).json("no data sent");
        if(!serviceID) return res.status(400).json("no id sent");

        updateService(serviceID, data)

        .then(service=>{
            if(!service) return res.status(400).json({message: "no service with id found"});
            if(!service.status) return res.status(400).json({message: service.message});

            return res.status(200).json({data:service.updatedData});
        })

        .catch(error=>{
           this.logError(error);
           return res.status(500).json({message: "Could not complete request"});
        })

   }

   deleteService = (req, res) =>{
      const deleteService = require('../domain/service/delete_service');

      let serviceID = req.params['id'] || null;

      if(!serviceID) return res.status(400).json({message:"no resume id sent"});

      deleteService(serviceID)
      .then(deleted=> { return res.status(200).json({data:{}}) })

      .catch(error=> { 
        this.logError(error);
        return res.status(500).json({message: "Could not complete request"});
      })
   }

}


module.exports = ServiceController;