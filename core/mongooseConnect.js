const mongoose = require('mongoose');

// ####Connect Local
function connectLocal(dbname) {
	mongoose.connect(`mongodb://localhost/${dbname}`);
	let db = mongoose.connection;
	//#check for error
	db.on('error', (error) => {
		console.log(error);
		return;
	});
	//#check connection
	db.once('open', () => {
		console.log('Connected to MongoDB Local');
	});
	return db;
}

// ####Connect Atlas
function connectAtlas(connectionString) {
	mongoose.connect(
		connectionString,
		(error) => {
			if (error)
				console.log('Could not Connect to mongoDB Atlas : \n ' + error);
			else console.log('Connected to mongoDB Atlas');
		}
	);
}

module.exports = { connectLocal, connectAtlas };
