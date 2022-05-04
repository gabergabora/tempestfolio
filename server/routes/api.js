const express = require('express');
const router = express.Router();

(require('./api/resume'))(router);
(require('./api/service'))(router);
(require('./api/experience'))(router);
(require('./api/project'))(router);
(require('./api/expertise'))(router);
(require('./api/blog'))(router);
(require('./api/mail'))(router);
(require('./api/tag'))(router);
(require('./api/profile'))(router);
(require('./api/admin.js'))(router);


module.exports = router;