const Joi = require('joi');
const Imagekit = require('../../libs/imagekit/Imagekit');
const ExpertiseModel = require('../../models/ExpertiseModel');


async function addNewExpertise(expertise){
   const {name, rating} = expertise;

    // Validate text data
    const schema = Joi.object({
        name: Joi.string().required().trim(true),
        rating: Joi.string().required().trim(true),
    });

    try{
        const value = await schema.validateAsync(expertise);
    }
    catch(error){
        const {_original, details} = error;
        const errorMessage =  (details[0]['message']).replace(/\"/g, "");

        let errorObject = {};

        errorObject.status = false;
        errorObject.message = `parameter ${errorMessage}`;

        return errorObject;
    }

    // if(!icon || icon == "undefined" || (getFileExtension(icon)) != "svg"){
    //     let errorObject = {};

    //     errorObject.status = false;
    //     errorObject.message = `Invalid or empty Icon media. Media can only be svg files `;

    //     return errorObject;
    // }

    //Upload media
    // const projectIcon = await uploadMedia(icon);

    // if(!projectMediaDetails.status){
    //     let errorObject = {};

    //     errorObject.status = false;
    //     errorObject.message = `Could not upload Icon media`;

    //     return errorObject;
    // }

    let newExpertise = {name, rating: parseInt(rating)};

    return {status:true, data: await (new ExpertiseModel(newExpertise)).save() }
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
