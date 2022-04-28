const MessageModel = require('../../models/MessageModel');

async function deleteMessage(message_id){
    await MessageModel.findByIdAndDelete(message_id);

    return {status: true};
}


module.exports = deleteMessage
