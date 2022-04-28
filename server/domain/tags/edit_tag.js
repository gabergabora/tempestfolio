const TagModel = require('../../models/TagModel');

async function editTag(tag_id, tagname){
    return await TagModel.findByIdAndUpdate(tag_id, {name: tagname}, {new: true});
}


module.exports = editTag;