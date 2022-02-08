const indexRouter = require('./index'); 
const adminRouter = require('./admin'); 
const apiRouter = require('./api'); 

/**
 * 
 * @param {*} app 
 */
function route(app){
    app.use("/", indexRouter);
    app.use('/admin', adminRouter);
    app.use('/api', apiRouter);
}


module.exports = route;