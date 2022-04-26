const ApiController = require('./ApiController');


class TagController extends ApiController{
   getTags = (req, res) => {
      const fetchTags = require('../domain/tags/fetch_tags');

      fetchTags()
      .then(tags=>{
         return res.status(200).json({data:tags});
      })
      .catch(error=>{
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

      .catch(error=> {
         this.logError(error);
         return res.status(500).json({message:"could not complete request"});
      })

   };


   editTag = (req, res) => {
      const editTag = require('../domain/tags/edit_tag');

      const tagID = req.params.id;
      const tagname = req.body.name

      if(!tagID || !tagname) return res.status(400).json("tag id and name are required");

      editTag(tagID, tagname)
      .then((tag)=>{
         if(!tag) return res.status(404).json({message: "no tag with id found"});

         return res.status(200).json({data:tag});
      })
      .catch(error=>{
         this.logError(error);
         return res.status(500).json({message:"could not complete request"})
      })
   }


   deleteTag = (req, res) => {
      const deleteTag = require('../domain/tags/delete_tag');

      const tagID = req.params.id;

      if(!tagID) return res.status(400).json("no id sent");

      deleteTag(tagID)
      .then(()=>{
         return res.status(200).json({data:{}});
      })
      .catch(error=>{
         this.logError(error);
         return res.status(500).json({message:"could not complete request"})
      })
   }

}


module.exports = TagController;