const MessageModel = require('../../models/MessageModel');

 async function findOneMessage(message_id){
    return await MessageModel.findById(message_id);
}

module.exports = findOneMessage;