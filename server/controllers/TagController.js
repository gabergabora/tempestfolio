const ApiController = require('./ApiController');


class TagController extends ApiController{
   getTags = (req, res, next) => {
      const fetchTags = require('../domain/tags/fetch_tags');

      fetchTags()
      .then(tags=>{
         return res.status(200).json({data:tags});
      })
      .catch(error=>{
         next(error);
      });
   }


   createTag = (req, res, next) => {
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
         next(error);
      })

   };


   editTag = (req, res, next) => {
      const editTag = require('../domain/tags/edit_tag');

      const tagID = req.params.id || null;
      const tagname = req.body.name

      if(!tagID || !tagname) return res.status(400).json("tag id and name are required");

      editTag(tagID, tagname)
      .then((tag)=>{
         if(!tag) return res.status(404).json({message: "no tag with id found"});

         return res.status(200).json({data:tag});
      })
      .catch(error=>{
         next(error);
      })
   }


   deleteTag = (req, res, next) => {
      const deleteTag = require('../domain/tags/delete_tag');

      const tagID = req.params.id || null;

      if(!tagID) return res.status(400).json("no id sent");

      deleteTag(tagID)
      .then(()=>{
         return res.status(200).json({data:{}});
      })
      .catch(error=>{
         next(error);
      })
   }

}


module.exports = TagController;