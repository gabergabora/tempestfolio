const mongoose = require('mongoose');

// Admin Schema
let adminSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	mailVerified: {
		type: Boolean,
		default: false,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('admin', adminSchema);
