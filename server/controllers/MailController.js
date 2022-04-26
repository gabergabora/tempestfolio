const ApiController = require('./ApiController');

class MailController extends ApiController{  
  getMessages = (req, res) => {
    const findMessages = require('../domain/message/find_messages');

    // check for pagination
    let entries  = req.query['entries'];
    let pageIndex  = req.query['index'];
    let filterSpec = (req.query['filter']) && (req.query['filter']).split(" ");
    let filterData = {};


    //accept filter
    if(filterSpec){
      const acceptableFilterVerbs = ["read"];
  
      for(let filter of filterSpec){
        const splittedFilter = (filter.split("."));
  
        let filterVerb = splittedFilter[0];
        let filterValue = splittedFilter[1];
  
        if(acceptableFilterVerbs.includes(filterVerb)){
          filterData[filterVerb] = filterValue;
        }
      }
    }
    

    findMessages(entries, pageIndex, filterData)
    .then(messages=>{
        return res.status(200).json({data:messages});
    })

    .catch(error=>{
        this.logError(error);
        return res.status(500).json({message:"could not complete request"});
    });
  }

  getSingleMessage = (req, res) => {
    const findOneMessage = require('../domain/message/find_one_message');
  
    let messageID = req.params['id'] || null;

    if(!messageID) return res.status(400).json("no id sent");

    findOneMessage(messageID)
    .then(message=>{
        if(!message) return res.status(400).json("no message with given id found")
        return res.status(200).json({data:message});
    })

    .catch(error=>{
        this.logError(error);
        return res.status(500).json({message:"could not complete request"});
    });
  }
  
  addMessage = (req, res) => {
    const addNewMessage = require('../domain/message/add_new_message');

    addNewMessage(req.body)
    .then(message=>{
        if(!message.status)return res.status(400).json({message: message.message});

        return res.status(200).json({data: message.data});
    })
    .catch(error=>{
       this.logError(error);
       return res.status(500).json({message: "Could not complete request"});
     })
  }

  readMessage = (req, res) => {
    let readMessage = require('../domain/message/read_message');

    const messageID = req.params.id;
    if(!messageID) return res.status(400).json("no id sent");

    readMessage(messageID)
    .then(message=>{ 
        if(!message.status) return res.status(400).json({message: "no message with id found"});

        return res.status(200).json({data: message.data});
    })
    .catch(error=>{
        this.logError(error);
        return res.status(500).json({message: "could not complete request"});
    })

  }

  deleteMessage = (req, res) => {
    let deleteMessage = require('../domain/message/delete_message');

    const messageID = req.params.id;
    if(!messageID) return res.status(400).json("no id sent");

    deleteMessage(messageID)
    .then(status=>{ 
        if(!status) return res.status(400).json({message: "no message with id found"});

        return res.status(200).json({data: {}});
    })
    .catch(error=>{
        this.logError(error);
        return res.status(500).json({message: "could not complete request"});
    })
  }

}


module.exports = MailController;