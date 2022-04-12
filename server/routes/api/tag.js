const TagController = require('../../controllers/TagController.js');
const tagController = new TagController;

function Route(router){
    router.get('/tag/', tagController.getTags);
    router.post('/tag/', tagController.createTag);
    router.put('/tag/:id', tagController.editTag);
    router.delete('/tag/:id', tagController.deleteTag);
}

module.exports = Route;
