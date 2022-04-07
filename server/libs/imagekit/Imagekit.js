const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');
const logger = require('../../../app/logger');

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
						logger.error(error.toString(), __filename);
						reject(error);
					}
					else 
					{
						logger.info("Imagekit file upload successful");
						resolve(data)
					};
				}
			);
		});
	}


	static deleteFile(fileId){
		logger.info("Imagekit deleting media...");

		return new Promise((resolve, reject)=>{
			Imagekit.imagekitErrandBoy.deleteFile(fileId, function(error, result) {
				if(error) {
					logger.error("Imagekit file to be deletd does not exist", __filename);
					resolve();
				}
				else {
					logger.info("Imagekit media deletion successful", __filename);
					resolve();
				}
			});
		});
	}


}

module.exports = Imagekit;
