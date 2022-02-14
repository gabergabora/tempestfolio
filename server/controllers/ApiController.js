const Requester = require('../http/Requester');
const Responder = require('../http/Responder');

class ApiController {
    
    response;

    initRequest = (req, res) => {
        
        let requester =  new Requester(req);

        // Make request properties accessible 
        /**
         * Will not load objects in _proto_
         */
        (Object.keys(requester)).forEach(k=>{
            this[k] = requester[k];
        })


        // delete requester object
        requester = null;

        // load responder
        this.response = res;

    }

    /** Since most find routes do not have unique request validation
     * we can decide to handle get requests from the api controller
     * and override in special domain find
     */

     getExperiences = (model, req, res) => {
        const findResources = require('../domain/api/find_resource');
  
        // check for pagination
        let entries  = req.query['entries'];
        let pageIndex  = req.query['index'];
        // lastId = req.query['lastId'];
  
        findResources(model, entries, pageIndex)
  
        .then(resources=>{
           return res.status(200).json({data:resources});
        })
  
        .catch(err=>{
           return res.status(500).json({message:"could not complete request"});
        });
  
     }
}


module.exports = ApiController;

