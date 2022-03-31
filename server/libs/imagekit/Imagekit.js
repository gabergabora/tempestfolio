const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');
const logger = require('../../../core/logger');

class Imagekit {
	/**
	 * @description ImageKIt Api config-
	 */
	static imagekitErrandBoy = new ImageKit({
		publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
		privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
		urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
	});


	/**
	 *  @description Push file to imagekit
	 */
	static upload(file, remoteFolder="portf/res") {
		Imagekit.log("Imagekit uploading...");

		const fileName = file['originalname'];
		const fileData = file.buffer;

		return new Promise((resolve, reject) => {
			Imagekit.imagekitErrandBoy.upload({file:fileData, fileName, folder: remoteFolder}, (error, data) => {
					if (error) {
                        //log error
						Imagekit.log(error, "error");
						reject(error);
					}
					else 
					{
						Imagekit.log("Imagekit file upload successful");
						resolve(data)
					};
				}
			);
		});
	}


	static deleteFile(fileId){
		Imagekit.log("Imagekit deleting media...");

		return new Promise((resolve, reject)=>{
			Imagekit.imagekitErrandBoy.deleteFile(fileId, function(error, result) {
				if(error) {
					Imagekit.log("Imagekit file to be deletd does not exist", "error");
					resolve();
				}
				else {
					Imagekit.log("Imagekit media deletion successful");
					resolve();
				}
			});
		});
	}


	static log(info, level="info"){
		let message;

		if(typeof info == "object")
		  message = info.toString();
		else
		  message = info;

		logger.log({
			level: level,
			message: message,
			meta: {where: __filename, date: (new Date()).toLocaleString()}
		})
	}
}

module.exports = Imagekit;
