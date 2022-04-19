const Mailer = require('../../libs/mailer/mailer');
const logger = require('../../../app/logger');
const OTPService = require('../Services/otp/OTP');
const OTPModel = require('../models/OTPModel');
const AuthController = require('./AuthController');
const AdminModel = require('../models/AdminModel');

class MailVerifyController extends AuthController {
    OTPService;
    loffer;

    /*
    *  @description SETUP Route
    *  @method POST /
    */
    constructor(){
        super(AdminModel);
        this.OTPService = new OTPService(OTPModel, logger);
        this.logger = logger;
    }

    getMailVerify = (req, res) => {
        //Generate and send otp to email
        const admin = req.session.admin;
        if (!admin) return res.redirect(this.LOGIN_ROUTE);

        if(admin.mailVerified) res.redirect(this.ADMIN_HOME)

        this.AdminModel.findOne({ username: admin }).then((admin) => {
            if (admin.mailVerified) return res.redirect(this.ADMIN_HOME);

            res.render('auth/verify', {});
        });
    };


    otpGenerate = (req, res) => {
        //generate and mail otp 
	    const admin = req.session.admin;
	    if (!admin) return res.status(401).send({});
	    this.AdminModel.findOne({ username: admin })
        .then((admin)=>{

			const { _id, username, email } = admin;

            // Clear all otp related to user in database
			// OTP.clear(_id);

            this.OTPService.create(_id)
            .then(otp => {
                //send otp mail
                Mailer.mail(
                    email,
                    `HI ${username}, Thank you for choosing Longbotton
                    <br />
                    Please use the code <strong>${otp}</strong> to verify your control room account `
                )
                .then((info) => {
                    logger.info(info.toString(), __filename)
                    res.json({ status: 'success'});
                })
                .catch((error) => {
                    this.logger.error(error.toString(), __filename);
                    res.json({ status: 'failed' });
                });
            })

        })

    }


    otpVerify = (req, res) => {
        let userCode = req.body.otp || '';

        const admin = req.session.admin;
        if (!admin) return res.status(401).send({});

    
        this.AdminModel.findOne({ username: admin }).then((admin) => {
            const { _id } = admin;

            this.OTPService.verify(userCode, _id)
                .then((status) => {
                    if (status.isVerified) {
                        //Set user account to verified
                        admin.mailVerified = true;
                        admin.save()
                        .catch((error) => {
                            this.logger.error(error.toString(), __filename);
                        });
                    }
                    res.json(status);
                })
                .catch((error) => {
                    console.log(error)
                    // this.logger.error(error.toString(), __filename);
                    return res.status(500).json({});
                });
        });
    };

}

module.exports = MailVerifyController;