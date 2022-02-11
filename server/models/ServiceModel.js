const mongoose = require('mongoose');

let serviceSchema = new mongoose.Schema({
	icon: String,
	title: { type: String, required: true },
	take: { type: String, required: true },
	visibility: { type: Boolean, default: true },
});


module.exports = mongoose.model('service', serviceSchema);

  
