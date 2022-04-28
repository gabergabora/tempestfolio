const nodemailer = require('nodemailer');
// Config Keys
const Host_Mail_Address = process.env.Host_Mail_Address;
const Host_Mail_Password = process.env.Host_Mail_Password;

function mail(mail, message) {
	return new Promise((resolve, reject) => {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			name: "Gmail",
			host: "smtp.gmail.com",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
			user: Host_Mail_Address, 
			pass: Host_Mail_Password, 
			},
		});

		transporter.sendMail({
			from: Host_Mail_Address,
			to: mail,
			subject: 'Email Verification',
			html: message,
		})
		.then((info)=>{
			console.log("Message sent: %s", info.messageId);
			resolve(info);
		})
		.catch(error=>reject(error))
		
	});
}


module.exports = { mail };
