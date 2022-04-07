const ApiController = require('./ApiController');


class TagController extends ApiController{
   getTags = (req, res) => {
      const fetchTags = require('../domain/tags/fetch_tags');

      fetchTags()
      .then(tags=>{
         return res.status(200).json({data:tags});
      })
      .catch(err=>{
         this.logError(error);
         return res.status(500).json({message:"could not complete request"});
      });
   }


   createTag = (req, res) => {
      const createTag = require('../domain/tags/create_tag');

      const tagName = req.body.name;
	   if (!tagName) return res.status(400).json({ status: 0, message: 'client error' });

      createTag(tagName)
      .then(service=>{
         if(!service.status)
            return res.status(400).json({message:service.message});

         return res.status(200).json({data:service.data}) 
      })

      .catch(err => {
         this.logError(error);
         return res.status(500).json({message:"could not add service at the moment"});
      })

   };

}


module.exports = TagController;