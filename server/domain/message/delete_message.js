const MessageModel = require('../../models/MessageModel');

async function deleteMessage(message_id){
    if(!message_id)
        throw new Error("delete_expertise requires param project_id");

    await MessageModel.findByIdAndDelete(message_id);

    return {status: true};
}


module.exports = deleteMessage
