const Joi = require('joi');
const BlogModel = require('../../models/BlogModel');


async function updateBlog(blog_id, data){
    const disAllowedProperties = ["_id", "__v"];
    let blog = await BlogModel.findById(blog_id);


    if (!blog) return null;

    const schema = Joi.object({
        title: Joi.string().trim(true),
        image: Joi.string().trim(true),
        link: Joi.string().trim(true),
        extract: Joi.string().trim(true),
        tags: Joi.array().items(Joi.string()),
        date: Joi.string().trim(true)
    })


    try{
        const value = await schema.validateAsync(data);
    }
    catch(error){

      const {_original, details} = error;
      const errorMessage =  (details[0]['message']).replace(/\"/g, "");

      let errorObject = {};

      errorObject.status = false;
      errorObject.message = `parameter ${errorMessage}`;

      // return object of status of false and error message
      return errorObject;
    }


    (Object.keys(blog._doc)).forEach(property=>{
        if(!disAllowedProperties.includes(property)){
            if(data[property] != undefined){
                blog[property] = (data[property]);
            }
        }
    })

    let updatedBlog = await blog.save({new: true});

    return {status:true, updatedData: updatedBlog};
}


module.exports = updateBlog;