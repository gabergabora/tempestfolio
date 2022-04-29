const Mailer = require('../../libs/mailer/mailer');
const logger = require('../../../app/logger');
const OTPService = require('../Services/otp/OTP');
const OTPModel = require('../models/OTPModel');
const AuthController = require('./AuthController');
const AdminModel = require('../models/AdminModel');

class MailVerifyController extends AuthController {
    OTPService;
    logger;

    /*
    *  @description SETUP Route
    *  @method POST /
    */
    constructor(){
        super(AdminModel);
        this.OTPService = new OTPService(OTPModel);
        this.logger = logger;
    }

    getMailVerify = (req, res, next) => {
        //Generate and send otp to email
        const sessionAdmin = req.session.admin;
        if (!sessionAdmin) return res.redirect(this.LOGIN_ROUTE);

        if(sessionAdmin.mailVerified) res.redirect(this.ADMIN_HOME)

        this.AdminModel.findOne({ username: sessionAdmin })
        .then((admin) => {
            if (admin.mailVerified) return res.redirect(this.ADMIN_HOME);

            res.render('auth/verify', {});
        })
        .catch((error) => next(error))
    };


    otpGenerate = async (req, res, next) => {
        //generate and mail otp 
        try {
            const sessionAdmin = req.session.admin;
            if (!sessionAdmin) return res.status(401).send({});

            let adminData = await this.AdminModel.findOne({ username: sessionAdmin });
            if(!adminData) res.status(400).json({message: "could not find any admin registered account"});

            let { _id, username, email } = adminData;

            let otpCode = await this.OTPService.create(_id);
            let mailMessage = `HI ${username}, Thank you for choosing Longbotton <br /> Please use the code <strong>${otpCode}</strong> to verify your control room account`;
            
            let mailInfo = await Mailer.mail(email, mailMessage);
            logger.info(JSON.stringify(mailInfo), __filename); // mailifo is not convertible to string

            res.json({status: 'success'});

        }
        catch(error){
            next(error);
        }

    }

    otpVerify = async (req, res, next) => {
        let userCode = req.body.otp || '';

        const sessionAdmin = req.session.admin;
        if (!sessionAdmin) return res.status(401).send({});

        try {
           let adminData = await this.AdminModel.findOne({ username: sessionAdmin });
           if(!admin) res.status(400).json({message: "could not find any admin registered account"});

           let otpVerificationStatus = await this.OTPService.verify(userCode, admin._id);

           if(otpVerificationStatus.isVerified){
                //Set user account to verified
                admin.mailVerified = true;
                await admin.save();
            }

           // return response
           res.json(otpVerificationStatus);

        }
        catch(error) {
           next(error);
        }
              
    };

}

module.exports = MailVerifyController;