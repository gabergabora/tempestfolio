const MessageModel = require('../../models/MessageModel');

async function readMessage(message_id){
    const updatedMessage = await MessageModel.findByIdAndUpdate(message_id, {read: true}, {new: true});

    return { status: updatedMessage ? true : false, data: updatedMessage };
}


module.exports = readMessage
