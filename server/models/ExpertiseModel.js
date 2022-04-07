const mongoose = require('mongoose');

let expertiseSchema = new mongoose.Schema({
	icon: {original_name: String, file_id: String, url: String, thumb: String},
	name: { type: String, required: true },
	rating: { type: Number, required: true },
});

module.exports = mongoose.model('expertise', expertiseSchema);
