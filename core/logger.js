var winston = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV;
const logDir = 'logs';

// Create folder
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const now = new Date();

var logger = winston.createLogger({
transports: [
    new winston.transports.File({
    name: 'error-file',
    filename: './logs/exceptions.log',
    level: 'error',
    json: false,
    }),

    new winston.transports.File({
    filename: `${logDir}/-apimodules.log`,
    timestamp: now,
    datePattern: 'dd-MM-yyyy',
    prepend: true,
    json: false,
    level: env === 'development' ? 'verbose' : 'info',
    }),
],
exitOnError: false,
});

module.exports = logger;

module.exports.stream = {
    write: function (message) {
        logger.info(message);
        console.log('message = ', message);
    },
};
