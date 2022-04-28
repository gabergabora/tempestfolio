const mongoose = require('mongoose');

let resumeSchema = new mongoose.Schema({
	fileName: { type: String, required: true },
	fileId: { type: String, required: true },
	fileSize: { type: Number, required: true },
	filePath: { type: String, required: true },
	url: { type: String, required: true },
	fileExtension: { type: String, required: true },
	active: { type: Boolean, default: false },
});

module.exports = mongoose.model('resume', resumeSchema);


  
