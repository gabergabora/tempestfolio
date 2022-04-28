const ApiController = require('./ApiController');

class BlogController extends ApiController {

    getAllBlogs = async (req, res, next) => {
        const findBlogs = require('../domain/blog/find_blogs');
    
        // check for pagination
        let entries  = req.query['entries'];
        let pageIndex  = req.query['index'];

        findBlogs(entries, pageIndex)
        .then(blogs=>{
            return res.status(200).json({data:blogs});
        })
        .catch(error=>{
            next(error);
        });

    }


    getSingleBlog = (req, res, next) => {
        const findOneBlog = require('../domain/blog/find_one_blog');
  
        let blogID = req.params['id'] || null;
  
        if(!blogID) return res.status(400).json("no id sent");
  
        findOneBlog(blogID)
        .then(blog=>{
           if(!blog){
              let errorMessage = "no blog with the id found";
              return res.status(400).json({message: errorMessage});
           }
           return res.status(200).json({data:blog});
        })
        .catch(error=>{
            next(error);
        });
  
    }


    addBlog = (req, res, next) => {
        const createBlog = require('../domain/blog/create_blog');

        const data = req.body;

        if(!(Object.values(req.body)).length) return res.status(400).json("no data sent");
        
        createBlog(data)
        .then(blog=>{ 
            if(!blog.status) return res.status(400).json({message: blog.message});

            return res.status(200).json({data: blog.data});
        })
        .catch(error=>{
            next(error)
        })
    }


    editBlog = (req, res, next) => {
        const updateBlog = require('../domain/blog/update_blog');

        
        let blogID = req.params['id'];
        let data = req.body;

        if(!(Object.values(data)).length) return res.status(400).json("no data sent");
        if(!blogID) return res.status(400).json("no id sent");

        updateBlog(blogID, data)

        .then(blog=>{
            if(!blog) return res.status(400).json({message: "no blog with id found"});
            if(!blog.status) return res.status(400).json({message: blog.message});

            return res.status(200).json({data:blog.updatedData});
        })

        .catch(error=>{
          next(error)
        })

   }


    removeBlog = (req, res, next) => {
        const deleteBlog = require('../domain/blog/delete_blog');

        let blogID = req.params['id'] || null;

        if(!blogID) return res.status(400).json({message:"no resume id sent"});

        deleteBlog(blogID)
        .then(deleted=> { return res.status(200).json({data:{}}) })
        .catch(error=> { 
           next(error);
        })
    }
}


module.exports = BlogController;