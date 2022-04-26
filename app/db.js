const mongodb = require('./providers/mongodb')
const MONGO_URI = process.env.MONGO_URI;

function connect(){
        mongodb.connect(MONGO_URI)
        .then(()=>{
            console.log("database connected");
        })
        .catch(error=>{
            console.log(error);
            // process.exit();
        })
}

module.exports.connect = connect;