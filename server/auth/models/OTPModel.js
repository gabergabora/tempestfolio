const mongoose = require('mongoose');

let OTPSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	expiry: {
		type: Number,
		default: 10,
	},
	created: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('otp', OTPSchema);
