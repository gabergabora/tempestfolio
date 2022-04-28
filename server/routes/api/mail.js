const MailController = require('../../controllers/MailController');
const mailController = new MailController;

function Route(router){
    router.post('/mail/', mailController.addMessage);
    router.get('/mail/', mailController.getMessages);
    router.get('/mail/:id', mailController.getSingleMessage);
    router.put('/mail/:id/read', mailController.readMessage);
    router.delete('/mail/:id', mailController.deleteMessage);
}

module.exports = Route;