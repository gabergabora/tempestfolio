const Joi = require('joi');
const Imagekit = require('../../libs/imagekit/Imagekit');
const ExpertiseModel = require('../../models/ExpertiseModel');


async function addNewExpertise(expertise){
   const {name, rating, icon} = expertise;
   const expertiseData = {name, rating}


    // Validate text data
    const schema = Joi.object({
        name: Joi.string().trim(true),
        rating: Joi.string().trim(true),
    });

    try{
        await schema.validateAsync(expertiseData);
    }
    catch(error){
        const {_original, details} = error;
        const errorMessage =  (details[0]['message']).replace(/\"/g, "");

        let errorObject = {};

        errorObject.status = false;
        errorObject.message = `parameter ${errorMessage}`;

        return errorObject;
    }

    if(!icon || icon == "undefined" || (getFileExtension(icon.originalname)) != "svg"){
        let errorObject = {};

        errorObject.status = false;
        errorObject.message = `Invalid or empty Icon media. Media can only be svg files `;

        return errorObject;
    }

    //Upload media
    const expertiseIconDetails = await uploadMedia(icon);

    if(!expertiseIconDetails){
        let errorObject = {};

        errorObject.status = false;
        errorObject.message = `Could not upload Icon media`;

        return errorObject;
    }


    let newExpertise = new ExpertiseModel({name, rating: parseInt(rating), icon:expertiseIconDetails})
     
    await newExpertise.save();

    delete newExpertise._doc.icon.file_id;
    return {status:true, data: newExpertise};
}


function getFileExtension(fileName){
    if(!fileName) return undefined;

    let fileNameArray = fileName.split('.');
    let fileExtension = fileNameArray[fileNameArray.length - 1];

    return fileExtension;
}


function uploadMedia (file){
    return new Promise((resolve, reject)=>{
        const remoteFolder = "portf/proj";
    
        if(!file) return;
    
        let data = {};
    
        Imagekit.upload(file, remoteFolder)
        .then(mediaDetails=>{
            data['original_name'] = file['originalname'];
            data['file_id'] = mediaDetails['fileId'];
            data['url'] = mediaDetails['url'];
            data['thumb'] = mediaDetails['thumbnailUrl'];

            resolve(data);
        })
        .catch(error=>reject(error))
    })
}



module.exports = addNewExpertise;
