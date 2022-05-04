const ApiController = require('./ApiController');

class ProfileController extends ApiController {
    updateProfile = async (req, res, next) => {
       const updateProfile = require('../domain/profile/update_profile');

       const profileData = req.body;

       if( !(Object.values(profileData)).length ){
           return res.status(400).json("no data sent");
       }

       updateProfile(profileData)
       .then(profile=>{
           if(!profile.status) return res.status(400).json({message: profile.message});

           return res.status(200).json({data: profile.data});
       })
       .catch(error=>{
           next(error);
       })

    }

    getProfileData = (req, res, next) => {
       const getProfile = require('../domain/profile/get_profile.js');

       getProfile()
       .then(profile=>{
           return res.status(200).json({data:profile});
       })
       .catch(error=>next(error))

    }
}

module.exports = ProfileController;