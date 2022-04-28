const TagModel = require('../../models/TagModel');

 async function findTags(){
    return await TagModel.find();
}

module.exports = findTags;