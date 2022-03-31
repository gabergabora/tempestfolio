const TagModel = require('../../models/TagModel');

 async function findTags(){
    let tags = await TagModel.find();

    return tags;
}

module.exports = findTags;