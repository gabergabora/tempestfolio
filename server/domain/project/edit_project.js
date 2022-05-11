const { promises } = require('nodemailer/lib/xoauth2');
const Imagekit = require('../../libs/imagekit/Imagekit');
const ProjectModel = require('../../models/ProjectModel');
const logger = require('../../../app/logger');
const { validate } = require('../../models/ProjectModel');
const Joi = require('joi');


const allowedProjectHeroTypes = ["png", "jpg", "jpeg", "webp"];
const allowedProjectFileTypes = [...allowedProjectHeroTypes, "gif"];
const accessiblePropertis = ['title', 'category', 'description', 'tags', 'video', 'github', 'externalUrl'];


async function editProject(project_id, editProjectData){

    const project = await ProjectModel.findById(project_id);

    // destructure project
    let {title, category, description, tags, video, github, externalUrl, imageHero, project_img_1, project_img_2, project_img_3} = editProjectData;


    /* 
       Formdata will always convert an array to string which will force tags to come in strings seperated by commas
       The nature of this api forces mimetypes to be sent alongside json data which shouldn't be.  
       For the sake of now, we would manually convert string tags to an array. 
       PS this is done because the api is tighly coupled with the app
    */
    tags = (typeof tags === "string")? tags.split(",") : tags ;

    let projectData = {title, category, description, tags, video, github, externalUrl};
    let projectHero = imageHero === "undefined" ? null : imageHero[0];
    let projectMedias = [project_img_1, project_img_2, project_img_3];

    const schema = Joi.object({
        title: Joi.string().trim(true).allow(''),
        category: Joi.string().trim(true).allow(''),
        description: Joi.string().trim(true).allow(''),
        video: Joi.string().trim(true).allow(''),
        github: Joi.string().trim(true).allow(''),
        externalUrl: Joi.string().trim(true).allow(''),
        tags: Joi.array().items(Joi.string()).allow(''),
    });

    try{
        const value = await schema.validateAsync(projectData);
    }
    catch(error){
      const {_original, details} = error;
      const errorMessage =  (details[0]['message']).replace(/\"/g, "");

      let errorObject = {};

      errorObject.status = false;
      errorObject.message = `parameter ${errorMessage}`;

      return errorObject;
    }

    
    (Object.keys(projectData)).forEach(property=>{
        let propertyValue = projectData[property];

        if( propertyValue && accessiblePropertis.includes(property) ){
            project[property] = propertyValue;
        }
    });


    // Main Image
    if(projectHero){
        let isUploadConditionMet = false;

        if(!project.imageHero)
          isUploadConditionMet = true;

        else if(project.imageHero.original_name !== projectHero.originalname)
          isUploadConditionMet = true;

        if(isUploadConditionMet){
           //validate media
           if(!validateMediaHero(projectHero)){
              return {status:false, message: `${projectHero.originalname} media file is of unsupported file type`};
           }

           // delete previous image remotely if available
           if(project.imageHero){
            await Imagekit.deleteFile(project.imageHero.file_id);
           }

           // upload and update media
           project.imageHero = await uploadProjectMedia(projectHero);
        }
    }

    // Other Images
    for(let i = 0; i < projectMedias.length; i++){


        let updateMedia = (projectMedias[i]) === "undefined" ? null : (projectMedias[i])[0];
        let projectSavedMedia = (project.imgs)[i];

        let isUploadConditionMet = false;

        if(updateMedia){
            if(!projectSavedMedia)
                isUploadConditionMet = true;

            else if(projectSavedMedia.original_name !== updateMedia.originalname) // we are not uploading the same image
                isUploadConditionMet = true;

            if(isUploadConditionMet){
                //validate media
                if(!validateMedia(updateMedia)){
                    return {status:false, message: `${updateMedia.originalname} media file is of unsupported file type`};
                }
        
                // delete previous image remotely if available
                if(projectSavedMedia){
                    await Imagekit.deleteFile(projectSavedMedia.file_id);
                }
        
                // upload and update media
                (project.imgs)[i] = await uploadProjectMedia(updateMedia);
            }
        }

    }

    // Everything is right, Prepare project
    const updatedProject = await project.save();

    return {status: true, data: updatedProject};
}


function getFileExtension(fileName){
    if(!fileName) return undefined;

    let fileNameArray = fileName.split('.');
    let fileExtension = fileNameArray[fileNameArray.length - 1];

    return fileExtension;
}

function validateMediaHero(media){
    return (allowedProjectHeroTypes.includes(getFileExtension(media.originalname))); 
}

function validateMedia(media){
    return (allowedProjectFileTypes.includes(getFileExtension(media.originalname))); 
}

function uploadProjectMedia (file){
    return new Promise((resolve, reject)=>{
        const remoteFolder = "portf/proj";
    
        if(!file) return null;
    
        let data = {};
    
        Imagekit.upload(file, remoteFolder)
        .then(mediaDetails=>{
            data['original_name'] = file['originalname'];
            data['file_id'] = mediaDetails['fileId'];
            data['url'] = mediaDetails['url'];
            data['thumb'] = mediaDetails['thumbnailUrl'];

            resolve(data);
        })
        .catch(error=>{
            logger.error(error.toString(), __filename)
            reject(error)
        });
           
    }); 
}

module.exports = editProject