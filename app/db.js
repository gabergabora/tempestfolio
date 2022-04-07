const mongodb = require('./providers/mongodb')
const MONGO_URI = process.env.MONGO_URI;

function connect(){
    return mongodb.connectAtlas(MONGO_URI);
}

module.exports.connect = connect;