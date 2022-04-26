const MessageModel = require('../../models/MessageModel');

async function readMessage(message_id){
    if(!message_id)
        throw new Error("delete_expertise requires param project_id");

    const updatedMessage = await MessageModel.findByIdAndUpdate(message_id, {read: true}, {new: true});

    return { status: updatedMessage ? true : false, data: updatedMessage };
}


module.exports = readMessage
