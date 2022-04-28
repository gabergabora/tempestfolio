// service providers
function serviceProviders(app){
    (require('./providers/cors'))(app);
    (require('./providers/bodyparser'))(app);
    (require('./providers/session'))(app);
    (require('./providers/flash'))(app);
    (require('./providers/cookieparser'))(app);
}


module.exports = serviceProviders