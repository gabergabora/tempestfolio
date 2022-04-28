const mongodb = require('./providers/mongodb')
const MONGO_URI = process.env.MONGO_URI;
const logger = require('./logger');

function connect(){
        mongodb.connect(MONGO_URI)
        .then(()=>{
            console.log("database connected");
            logger.info("database connected");
        })
        .catch(error=>{
            console.log("database connection failed");
            logger.error(error.toString(), __filename);
        	process.exit();
        })
}

module.exports.connect = connect;