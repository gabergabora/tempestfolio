const AuthController = require('./AuthController');
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/AdminModel');
const PasswordResetModel = require('../models/PasswordResetModel') ;
const logger = require('../../../app/logger');
const Mailer = require('../../libs/mailer/mailer');
const uuid = require('uuid');


class PasswordResetController extends AuthController {

    constructor(){
        super(AdminModel);
    }


    verifyPasswordResetLink = (req, res, next) => {
        let prid = req.params.prid;

        PasswordResetModel.findOne({id: prid})
        .then(doc=>{
            if(!doc) {
                // return invalid link
                res.render('auth/password-reset-error', {errtype: 'invalid-link'});
            } 

            //check if is Expired
            if( (parseInt(doc.time) + (1000 * 3600 * 24)) < (new Date()).getTime() ) {
                res.render('auth/password-reset-error', {errtype: 'expired-link'});
            } 

            //return new password form
            res.render('auth/password-reset-form', {errors: false});

        })
        .catch((error) =>{
            logger.error(error.toString(), __filename);
            next(error);
        })
       
    }

    setupPasswordReset = async (req, res) => {
        try {
          const admin = await AdminModel.findOne();

          let adminEmailAddress = admin.email;
          let username = admin.username;

          let salt = await bcrypt.genSalt(10);
          let hash = await bcrypt.hash(uuid.v4(), salt);
              hash = hash.replace(/\//g, "0");

          let link = `${process.env.APP_HOME_URL}/auth/passwordreset/${hash}`;

          //save reset and mail link
          let reset = await new PasswordResetModel( { 
                id: hash,
                time: (new Date()).getTime(),
          });

          await reset.save();

          let mailInfo = await Mailer.mail(
            adminEmailAddress,

            `HI ${username}, A request to reset your password has been sent
            <br />
            use this link <a href="${link}">${link}</a> to reset your password`
          );

          logger.info(mailInfo.toString(), __filename);

          res.render('auth/password-reset');

        } catch (error) {
            logger.error(error.toString(), __filename);
            throw error;
        }

    }

    postResetPassword = async (req, res, next) => {
        const {password, confirm_password} = req.body;

        let errors = [];

        if(!password || !confirm_password) {
            errors.push('Password and confirm Password are both required');
        }
        if(password !== confirm_password){
            errors.push('Passwords do not match');
        }

        if(errors.length){
            //There is an errors
            res.render('auth/password-reset-form', {
                errors,
            });
        }

        try {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);

            await this.AdminModel.findOneAndUpdate({password: hash});

            //flash message and redirect to login
            req.flash('success', 'Password Changed!');
            res.redirect(this.LOGIN_ROUTE);

        }catch(error){
            logger.error(error.toString(), __filename);
            next(error);
        }

    }

}

module.exports = PasswordResetController;