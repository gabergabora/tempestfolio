const Joi = require('joi');
const ProfileModel = require('../../models/ProfileModel.js');

async function updateProfile(updateData){
    const {fullname, dp, email, nationality, languages, github, bio} = updateData;
    let openProperties = ['fullname', 'dp', 'email', 'nationality', 'languages', 'github', 'bio']; // properties open to mutation
    let profile = await ProfileModel.findOne({});
    let validData = {};
    let updatedProfile;

    for(let property of Object.keys(updateData)){
        let propertyValue = updateData[property];
        
        if(propertyValue && openProperties.includes(property)){
            validData[property] = propertyValue;
        }
    }

    //Only update if there is atleast one valid data
    if(!(Object.keys(validData)).length) return {status:false, message: "at leat one field must cointain data"};

    // If there's been no profile, create a new profile object
    if(!profile){ // proile is null
        profile = new ProfileModel(validData);
        updatedProfile = await profile.save();
    }
    else {
        for(let property of Object.keys(validData)){
            profile[property] = validData[property];
        }
        
        updatedProfile = await profile.save();
    }

    return {status:true, data: updatedProfile};
}

module.exports = updateProfile;