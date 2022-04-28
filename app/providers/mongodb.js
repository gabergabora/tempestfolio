const mongoose = require('mongoose');

function connect(connectionString) {
	return new Promise((resolve, reject)=>{
		mongoose.connect(connectionString, (error=>{
			if(error){
			  reject(error);
			}
			resolve('');
		}))
	})
}

module.exports = { connect };
