const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	subject: { type: String, required: true },
	message: { type: String, required: true },
	read: {type: Boolean, default: false},
	date: { type: String, default: (new Date()).getTime() },
});


module.exports = mongoose.model('message', messageSchema);
