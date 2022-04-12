const TagModel = require('../../models/TagModel');

async function deleteTag(tag_id){
    return TagModel.findByIdAndDelete(tag_id);
}

module.exports = deleteTag;