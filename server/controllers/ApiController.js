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
}


module.exports = ApiController;

