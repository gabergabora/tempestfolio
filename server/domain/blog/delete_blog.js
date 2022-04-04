const BlogModel = require('../../models/BlogModel');


async function deleteBlog(blog_id){

    await BlogModel.findByIdAndRemove(blog_id);

    return true;

}

module.exports = deleteBlog;