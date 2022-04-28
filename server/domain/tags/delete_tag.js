const TagModel = require('../../models/TagModel');

async function deleteTag(tag_id){
    return await TagModel.findByIdAndDelete(tag_id);
}

module.exports = deleteTag;