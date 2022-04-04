const Joi = require('joi');
const { promises } = require('nodemailer/lib/xoauth2');
const Imagekit = require('../../libs/imagekit/Imagekit');
const ProjectModel = require('../../models/ProjectModel');


const allowedProjectHeroTypes = ["png", "jpg", "jpeg", "webp"];
const allowedProjectFileTypes = [...allowedProjectHeroTypes, "gif"];


async function createNewProject(project){
    // destructure project
    const {title, category, description, tags, video, github, externalUrl, imageHero, project_img_1, project_img_2, project_img_3} = project;
    
    let projectData = {title, category, description, tags};
    let projectHero = imageHero == "undefined" ? imageHero : imageHero[0];
    let projectMedias = [project_img_1, project_img_2, project_img_3];
    let projectMediasErrors = [];
    let validMedias = [];


    //Run all validations First

    // Validate text datas
    const schema = Joi.object({
        title: Joi.string().required().trim(true),
        category: Joi.string().required().trim(true),
        description: Joi.string().required().trim(true),
        tags: Joi.string().required(),
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


    // Ensure at least one resource link present
    if(!video && !github && !externalUrl){
        errorMessage = "You must have at least one project resource to continue, either Video link,  github link or appliation link ";
        return {status: false, message: errorMessage};
    }


    // Validate Medias

    // Main Image
    if(!projectHero || projectHero == "undefined") 
        return {status: false, message: `frontpage media is required`};

    if (!allowedProjectFileTypes.includes(getFileExtension(projectHero['originalname'])) )
        return {status: false, message: `frontpage media ${projectHero['originalname']} is of unsupported file type`};


    // Other Images
    projectMedias.forEach((media, i)=>{
        // Switch to for loop and fast error
        // Make sure only allowed files are sent
        if(media && media != "undefined"){

            media = media[0];
            let mediaFilename = media['originalname'];
            
            if(!allowedProjectFileTypes.includes(getFileExtension(mediaFilename))){
                projectMediasErrors.push(`project media ${mediaFilename} is of unsupported file type`);
            }
        }
    })
   

    if(projectMediasErrors.length){
        // at least one media has a problem
        return {status: false, message: projectMediasErrors[0]};
    }

   
    // Everything is right

    // Prepare project
    let newProject = {title, category, description, video, github, externalUrl, tags};

    // upload Image imageHero
    let projectHeroUploadedDetails = await uploadProjectMedia(projectHero);
    newProject.imageHero = projectHeroUploadedDetails;

    const projectMediaDetails = await uploadProjectMedias(projectMedias);

    if(projectMediaDetails.status)
        newProject.imgs = projectMediaDetails.mediaDetails;
    else
        return {status: false, message:"failed to upload project medias"};
   
    
    let savedProject = await (new ProjectModel(newProject)).save();

    return {status: true, data: savedProject};
}


function getFileExtension(fileName){
    if(!fileName) return undefined;

    let fileNameArray = fileName.split('.');
    let fileExtension = fileNameArray[fileNameArray.length - 1];

    return fileExtension;
}

function uploadProjectMedia (file){
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

function uploadProjectMedias(mediaArray = []){
    return new Promise((resolve, reject)=>{

        if(!mediaArray.length){
            resolve({status: true, mediaDetails:[]});
        }

        let otherImages = [];
        // let uploadError = [];
    
        for(var i=0; i<mediaArray.length; i++){
            let media = mediaArray[i];
    
            if(media && media != "undefined"){
                media = media[0];
    
                let mediaInfo = uploadProjectMedia(media);
                otherImages.push(mediaInfo);
            }
    
    
            // After complete iteration, save project
            if( i >= (mediaArray.length-1)){
                Promise.all(otherImages)
                .then(values=>{
                    resolve({status: true, mediaDetails:values});
                })
    
                .catch(error=>{
                    resolve({status: false, errorDetails:error});
                });
            }
        }

    })

}
  

module.exports = createNewProject