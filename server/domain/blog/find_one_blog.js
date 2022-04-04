const BlogModel = require('../../models/BlogModel');


 async function findOneBlog(blog_id){

    let blog = await BlogModel.findById(blog_id);
    
    return blog;
}

module.exports = findOneBlog;