const createError = require('http-errors');

function handleError(app){
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
  
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        console.error(err);
        res.locals.message = "A server error occured. Please contact site owner";
        res.locals.error = req.app.get('env') === 'development' ? {} : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}


module.exports = handleError;


