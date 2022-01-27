const indexRouter = require('./index'); 
const adminRouter = require('./admin.js'); 

/**
 * 
 * @param {*} app 
 */
function route(app){
    app.use("/", indexRouter);
    app.use('/admin', adminRouter);
}


module.exports = route;