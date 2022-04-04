const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
	title: { type: String, required: true },
	image: { type: String, required: true },
	link: { type: String, required: true },
	extract: { type: String, required: true },
	tags: [String],
	date: { type: String, required: true },
});

// blogSchema.index({ tags: 'text' });

module.exports = mongoose.model('blog', blogSchema);
