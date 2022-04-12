const AuthController = require('./AuthController');
const logger = require('../../../app/logger');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/AdminModel');



class SetupController extends AuthController {
    /*
    *  @description SETUP Route
    *  @method GET /
    */
    constructor(){
        super(AdminModel);
    }

    getSetup = (req, res) => {
        this.AdminModel.findOne({ mailVerified: true })
            .then((document) => {
                if (document) return res.redirect(this.LOGIN_ROUTE);

                res.render('auth/setup', {
                    errors: undefined,
                });
            })
            .catch((error) => {
                logger.error(error.toString(), __filename);
            });
    };


    /*
    *  @description SETUP Route
    *  @method GET /
    */

    postSetup = (req, res) => {
        const { username, email, password, password2 } = req.body;

        const schema = Joi.object({
            username: Joi.string().required().trim(true),
            email: Joi.string().email().required().trim(true),
            password: Joi.string().min(6).required()
        });

        try {
            schema.validateAsync({ username, email, password });
        }
        catch{

            let validationErrors = [];

            if(error){
                error.details.forEach(detail=>{
                    validationErrors.push((detail.message).replace(/\"/g, ""));
                })

                return res.render('auth/setup', {
                    errors: validationErrors,
                    username,
                    email,
                    password,
                    password2,
                });
            }
        }

        if(password !== password2){
            return res.render('auth/setup', {
                errors: ["passwords do not match"],
                username,
                email,
                password,
                password2,
            });
        }

        
        // Register User
        this.AdminModel.deleteMany({}).catch((error) => logger.error(error.toString(), __filename));

        //save new admin to databse
        const adminUser = new this.AdminModel({
            username,
            email,
            password,
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(adminUser.password, salt, (err, hash) => {
                if (err) throw err;
                adminUser.password = hash;
                adminUser
                    .save()
                    .then((document) => {
                        //send a flash message
                        req.flash('success', 'Setup Successful!');
                        return res.redirect(this.LOGIN_ROUTE);
                    })
                    .catch((error) => logger.error(error.toString(), __filename));
            });
        });

    }
    
}


module.exports = SetupController;