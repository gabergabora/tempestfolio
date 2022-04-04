class BlogController {
    getAllBlogs = (req, res) => {
            const findBlogs = require('../domain/blog/find_blogs');
      
            // check for pagination
            let entries  = req.query['entries'];
            let pageIndex  = req.query['index'];
      
            findBlogs(entries, pageIndex)
      
            .then(blogs=>{
               return res.status(200).json({data:blogs});
            })
      
            .catch(err=>{
               return res.status(500).json({message:"could not complete request"});
            });

    }


    getSingleBlog = (req, res) => {
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
        .catch(err=>{
           //log error
           return res.status(500).json({message:"could not complete request"});
        });
  
    }


    addBlog = (req, res) => {
        const createBlog = require('../domain/blog/create_blog');

        const data = req.body;

        if(!Object.keys.length) return res.status(400).json("no data sent");
        
        createBlog(data)
        .then(blog=>{ 
            if(!blog.status) return res.status(400).json({message: blog.message});

            return res.status(200).json({data: blog.data});
        })
        .catch(error=>{
            console.log(error);
            return res.status(500).json({message: "could not complete request"});
        })
    }


    editBlog = (req, res) => {
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
           // Log error
           console.log(error);
           return res.status(500).json({message: "Could not complete request"});
        })

   }


    removeBlog = (req, res) => {
        const deleteBlog = require('../domain/blog/delete_blog');

        let blogID = req.params['id'] || null;

        if(!blogID) return res.status(400).json({message:"no resume id sent"});

        deleteBlog(blogID)
        .then(deleted=> { return res.status(200).json({data:{}}) })
        .catch(err=> { 
                return res.status(500).json({message:"could not delete blog at the moment"});
        })

    }
}


module.exports = BlogController;