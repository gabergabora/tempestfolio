const BlogController = require('../../controllers/BlogController.js');
const blogController = new BlogController;
   

function blogRoute(router){
    router.get('/blog/', blogController.getAllBlogs);
    router.get('/blog/:id', blogController.getSingleBlog);
    router.post('/blog/', blogController.addBlog);
    router.put('/blog/:id', blogController.editBlog);
    router.delete('/blog/:id', blogController.removeBlog);
}

module.exports = blogRoute;
