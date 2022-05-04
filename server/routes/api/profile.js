const profileController = new (require('../../controllers/ProfileController'));

function Route(router){
    router.put('/profile/', profileController.updateProfile);
    router.get('/profile/', profileController.getProfileData);
}

module.exports = Route;