const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const morganLogStream = fs.createWriteStream(path.join(__dirname, '../../', 'logs', 'morgan.log'), { flags: 'a' })

module.exports = function (app){
    // morgan
    app.use(morgan('combined', { stream: morganLogStream }))
    // log to console if on development
    if(process.env.NODE_ENV != "production") app.use(morgan('dev'));
}; 