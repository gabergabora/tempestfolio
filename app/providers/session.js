const session = require('express-session');

module.exports = function(app){
    app.use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
        })
    );
}; 