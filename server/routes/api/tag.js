const TagController = require('../../controllers/TagController.js');
const tagController = new TagController;

function Route(router){
    router.get('/tag/', tagController.getTags);
    router.post('/tag/', tagController.createTag);
}

module.exports = Route;
