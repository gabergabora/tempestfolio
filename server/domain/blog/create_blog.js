const Joi = require('joi');
const BlogModel = require('../../models/BlogModel');

async function createBlog(data){
    const { title, image, link, extract, tags, date} = data;

     //validate
     const schema = Joi.object({
        title: Joi.string().required().trim(true),
        image: Joi.string().required().trim(true),
        link: Joi.string().required().trim(true),
        extract: Joi.string().required().trim(true),
        tags: Joi.array().items(Joi.string()).required(),
        date: Joi.string().required().trim(true)
    })

    try{
        await schema.validateAsync(data);
    }
    catch(error){

      const {_original, details} = error;
      const errorMessage =  (details[0]['message']).replace(/\"/g, "");

      let errorObject = {};

      errorObject.status = false;
      errorObject.message = `parameter ${errorMessage}`;

      return errorObject;
    }

    const blogObject = { title, image, link, extract, tags, date };

    const newBlog = new BlogModel(blogObject);

    return {status:true, data:await newBlog.save()};
}

module.exports = createBlog;