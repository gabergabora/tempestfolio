const logger = require('../../app/logger');

class ApiController {
   response;
    
    constructor(){
      this.logger = logger
    }

    /** Since most find routes do not have unique request validation
     * we can decide to handle get requests from the api controller
     * and override in special domain find
     */

     getResources = (model, req, res) => {
        const findResources = require('../domain/api/find_resource');
  
        // check for pagination
        let entries  = req.query['entries'];
        let pageIndex  = req.query['index'];
        // lastId = req.query['lastId'];
  
        findResources(model, entries, pageIndex)
  
        .then(resources=>{
           return res.status(200).json({data:resources});
        })
  
        .catch(error=>{
           return res.status(500).json({message:"could not complete request"});
        });
  
     }

     logError = (error) => {
       this.logger.error(error.toString(), this.constructor.name);
     }
}


module.exports = ApiController;

