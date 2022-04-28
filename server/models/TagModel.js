const mongoose = require('mongoose');

let tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

tagSchema.index({ name: 1 });

module.exports = mongoose.model('tag', tagSchema);
