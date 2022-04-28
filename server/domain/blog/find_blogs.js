const paginate = require('../api/paginate');
const BlogModel = require('../../models/BlogModel');


 async function findBlogs(entries=null, pageIndex=null){
    if(entries){
        entries;
        pageIndex = pageIndex || 1;

        let paginatedService = await paginate(BlogModel, entries, pageIndex);
        
        return paginatedService;
    }
    
    let blogs = await BlogModel.find();

    return blogs;
}

module.exports = findBlogs;