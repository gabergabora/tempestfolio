const Joi = require('joi');
const MessageModel = require('../../models/MessageModel');

async function addNewMessage(messageData){
   const {name, email, subject, message} = messageData;

    // Validate text data
    const schema = Joi.object({
        name: Joi.string().trim(true).required(true),
        email: Joi.string().trim(true).required(true),
        subject: Joi.string().trim(true).required(true),
        message: Joi.string().trim(true).required(true),
    });

    try{
        const value = await schema.validateAsync({name, email, subject, message} );
    }
    catch(error){
        const {_original, details} = error;
        const errorMessage =  (details[0]['message']).replace(/\"/g, "");

        let errorObject = {};

        errorObject.status = false;
        errorObject.message = `parameter ${errorMessage}`;

        return errorObject;
    }

    let newMessage = new MessageModel({name, email, subject, message});
     
    await newMessage.save();

    return {status:true, data: newMessage};
}


module.exports = addNewMessage;
