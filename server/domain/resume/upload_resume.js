const Imagekit = require('../../libs/imagekit/Imagekit');
const ResumeModel = require('../../models/ResumeNodel');

async function uploadResume(resumeFile){
   if(!resumeFile)
     throw new Error('No file passed in uploadResume');

    // validate file
    const acceptableFormats = ['doc', 'docx', 'pdf'];
    const sizeLimit = 1000 * 1000 * 10; // 30 Megabyte
    const errors = [];
   
    let resumeFileName = resumeFile.originalname;
    let fileNameArray = resumeFileName.split('.');
    let fileExtension = fileNameArray[fileNameArray.length - 1];

    
    if (!acceptableFormats.includes(fileExtension.toLowerCase()))
        errors.push('invalid File Format');

    if (resumeFile.size > sizeLimit)
        errors.push('File Too Large'); // 1000 bytes = 1kb, 1000kb = 1mb

    if (errors.length > 0) 
        return {uploaded:false, error: errors[0]};


    //upload image using imagekit
    const uploadDetails = await Imagekit.upload(resumeFile);

    const {fileId, size, filePath, url} = uploadDetails;

    const newResume = new ResumeModel({fileName: resumeFileName, fileId, fileSize: size, filePath, url, fileExtension});

    await newResume.save();
    
    // do not send back imagekit fileId to client
    delete newResume._doc.fileId;

    return {uploaded:true, resume: newResume};

}

module.exports = uploadResume;