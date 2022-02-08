const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');


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
		/**
		 * Stage File in app /uploads
		 * Read file and push to remote
		 * Unlink staged file
		 */
		console.log('imageKit uploading...');
		console.log('Staging file...');
          
		const fileName = file['originalname'];
		const fileData = file.buffer;

		return new Promise((resolve, reject) => {
			Imagekit.imagekitErrandBoy.upload({file:fileData, fileName, folder: remoteFolder}, (error, data) => {
					if (error) {
                        //log error
						reject(error);
					}
					else resolve(data);
				}
			);
		});
	}


	static deleteFile(fileId){
		console.log("Imagekit deleting media");
		return new Promise((resolve, reject)=>{
			Imagekit.imagekitErrandBoy.deleteFile(fileId, function(error, result) {
				if(error) {
					//File to be deletd does not exist
					console.log("Imagekit media deletion failed"); // logs
					resolve();
				}
				else {
					console.log("Imagekit media deletion successful");
					resolve();
				}
			});
		});
	}
}

module.exports = Imagekit;
