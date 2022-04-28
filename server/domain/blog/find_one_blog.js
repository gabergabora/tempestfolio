const BlogModel = require('../../models/BlogModel');


 async function findOneBlog(blog_id){
    return await BlogModel.findById(blog_id);
}

module.exports = findOneBlog;