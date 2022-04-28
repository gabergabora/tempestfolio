const mongoose = require('mongoose');

let experienceSchema = new mongoose.Schema({
	icon: String,
	title: { type: String, required: true },
	company: { type: String, required: true },
	company_link: { type: String, required: true },
	from: { type: String, required: true },
	to: { type: String, required: true },
	experience: String,
});

module.exports = mongoose.model('experience', experienceSchema);
