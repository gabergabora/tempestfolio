const indexRouter = require('./index'); 
const adminRouter = require('./admin'); 
const apiRouter = require('./api'); 
const authRouter = require('./auth'); 

const ensureAuthenticatedMiddleware = require('../middlewares/ensureAuthenticated');


/**
 * 
 * @param {*} app 
 */
function route(app){
    app.use("/", indexRouter);
    app.use('/admin', ensureAuthenticatedMiddleware, adminRouter);
    app.use('/auth', authRouter);
    app.use('/api', apiRouter);
}


module.exports = route;