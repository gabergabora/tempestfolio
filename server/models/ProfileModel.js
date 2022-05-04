const mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
	fullname: { type: String},
	dp: { type: String},
	email: { type: String},
	nationality: { type: String},
	languages: { type: String},
	github: { type: String},
	bio: { type: String},
});

module.exports = mongoose.model('profile', profileSchema);
