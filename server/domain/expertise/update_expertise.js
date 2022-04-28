const Joi = require('joi');
const Imagekit = require('../../libs/imagekit/Imagekit');
const ExpertiseModel = require('../../models/ExpertiseModel');


async function addNewExpertise(expertise_id, updateData){
   const {name, rating, icon} = updateData;

   const expertise =  await ExpertiseModel.findById(expertise_id);

   if(!expertise) return {status: false, message: "no expertise with id found"};


    // Validate text data
    const schema = Joi.object({
        name: Joi.string().trim(true),
        rating: Joi.string().trim(true),
    });

    try{
        const value = await schema.validateAsync({name, rating});
    }
    catch(error){
        const {_original, details} = error;
        const errorMessage =  (details[0]['message']).replace(/\"/g, "");

        let errorObject = {};

        errorObject.status = false;
        errorObject.message = `parameter ${errorMessage}`;

        return errorObject;
    }

    // update expertise
    expertise.name = name;
    expertise.rating = rating;


    // check if icon is available
    if( icon && icon !== "undefined") {
        // check if icon name is different from former
        if(icon.originalname !== expertise.original_name){
            // delete former
            await Imagekit.deleteFile(expertise.icon.file_id);

            // Upload new
            if (getFileExtension(icon.originalname) != "svg") return {status: false, message: "only svg media type is allowed"};

            let newIconDetails = await uploadMedia(icon);

            if(!newIconDetails) return {status: false, message: "Could not upload Icon media"};

            expertise.icon = newIconDetails;
        }
    }


    let updatedExpertise = await expertise.save();

    delete updatedExpertise._doc.icon.file_id;

    return {status:true, data: updatedExpertise};
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
