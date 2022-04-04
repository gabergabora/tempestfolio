const mongoose = require('mongoose');

let expertiseSchema = new mongoose.Schema({
	icon: String,
	name: { type: String, required: true },
	rating: { type: Number, required: true },
});

module.exports = mongoose.model('expertise', expertiseSchema);
