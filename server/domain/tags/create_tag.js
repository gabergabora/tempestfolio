const TagModel = require('../../models/TagModel');

async function createTag(name){
     if(!name){
        let errorObject = {};

        errorObject.status = false;
        errorObject.message = `tag name is required`;
  
        return errorObject;
     }


    const newTag = new TagModel({name});

    const tag = await newTag.save();

    return {status:true, data:tag};
}


module.exports = createTag;