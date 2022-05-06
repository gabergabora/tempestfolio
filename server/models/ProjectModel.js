const mongoose = require('mongoose');

let projectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	imageHero: {original_name: String, file_id: String, url: String, thumb: String,},
    
	imgs: [
      {original_name: String, file_id: String, url: String, thumb: String},
      {original_name: String, file_id: String, url: String, thumb: String},
      {original_name: String, file_id: String, url: String, thumb: String},
	],

	tags: [String],
	video: String,
	github: { type: String },
	externalUrl: { type: String },
	date: { type: String, default: new Date().getTime().toString() },
	visibility: { type: Boolean, default: true },

});


module.exports = mongoose.model('project', projectSchema);

  
