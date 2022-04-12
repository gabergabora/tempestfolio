const createError = require('http-errors');

function handleError(app){
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
  
    app.use(function(err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        if(req.app.get('env') === 'development') {
            // set locals, only providing error in development
            console.log(err.status);
        }

        // render the error page
        err.status = err.status || 500;

        res.setHeader('Content-Type', 'text/html');
        res.status(err.status).render(`errors/${err.status}`);
    });
}


module.exports = handleError;


