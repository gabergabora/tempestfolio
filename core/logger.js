var winston = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV;
const logDir = 'logs';
const errorLogFile =  path.join(logDir, 'error.log');
const infoLogFile =  path.join(logDir, 'info.log');
const verboseLogFile =  path.join(logDir, 'verbose.log');


// Create folder
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);


const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { date: new Date().toLocaleString() },
      transports: [

      new winston.transports.File({ filename: errorLogFile, level: 'error' }),
      new winston.transports.File({ filename: verboseLogFile, level: 'verbose' }),
      new winston.transports.File({ filename: infoLogFile, level: 'info'}),
    ],
  });


// Transport to console on development environment
if (env !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}


module.exports = logger ;


// const now = new Date();

// var logger = winston.createLogger({
// transports: [
//     new winston.transports.File({
//     name: 'error-file',
//     filename: './logs/exceptions.log',
//     level: 'error',
//     json: false,
//     }),

//     new winston.transports.File({
//     filename: `${logDir}/-apimodules.log`,
//     timestamp: now,
//     datePattern: 'dd-MM-yyyy',
//     prepend: true,
//     json: false,
//     level: env === 'development' ? 'verbose' : 'info',
//     }),
// ],
// exitOnError: false,
// });

// module.exports = logger;

// module.exports.stream = {
//     write: function (message) {
//         logger.info(message);
//         console.log('message = ', message);
//     },
// };
