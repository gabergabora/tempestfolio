const ProfileModel = require('../../models/ProfileModel');


async function getProfile(entries, pageIndex){
   return await ProfileModel.findOne({});
   
}


module.exports = getProfile;