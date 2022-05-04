const ProfileModel = require('../../models/ProfileModel');


async function getProfile(entries, pageIndex){
   return await ProfileModel.find({});
   
}


module.exports = getProfile;