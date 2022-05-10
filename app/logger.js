var winston = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV;
const logDir = 'logs';
const errorLogFile =  path.join(logDir, 'error.log');
const infoLogFile =  path.join(logDir, 'info.log');
const verboseLogFile =  path.join(logDir, 'verbose.log');


// Create folder if it does not exist
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);


const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { date: new Date().toLocaleString()},
      transports: [

      new winston.transports.File({ filename: errorLogFile, level: 'error' }),
      new winston.transports.File({ filename: verboseLogFile, level: 'verbose' }),
      new winston.transports.File({ filename: infoLogFile, level: 'info'}),
    ],
  });


/** 
 * Heroku uses standard output to for manual logging
 * So we turn on console for it to reflect on hroku logs
 * */ 

logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));

module.exports = logger ;

module.exports.info = function(message, where=null){
  logger.log({
    level: "info",
    message: message,
    meta: {where: where ? where : '' }
  });
};

module.exports.error = function(message, where=null){
  logger.log({
    level: "error",
    message: message,
    meta: {where: where ? where : '' }
  });
};