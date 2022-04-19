const mongoose = require('mongoose');

let passwordResetSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('passwordreset', passwordResetSchema);
