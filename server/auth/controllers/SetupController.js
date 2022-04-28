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

    getSetup = (req, res, next) => {
        this.AdminModel.findOne({ mailVerified: true })
            .then((document) => {
                if (document) return res.redirect(this.LOGIN_ROUTE);

                res.render('auth/setup', {
                    errors: false,
                });
            })
            .catch((error) => {
                next(error);
            });
    };


    /*
    *  @description SETUP Route
    *  @method GET /
    */

    postSetup = async (req, res, next) => {
            const { username, email, password, password2 } = req.body;
            let validationErrors = [];


            try {
                const schema = Joi.object({
                    username: Joi.string().required().trim(true),
                    email: Joi.string().email().required().trim(true),
                    password: Joi.string().min(6).required()
                });

                await schema.validateAsync({ username, email, password });

            }
            catch(error){
                error.details.forEach(detail=>{
                    validationErrors.push((detail.message).replace(/\"/g, ""));
                })
                
                return res.render('auth/setup', { errors: validationErrors, username, email, password, password2});
            }
           

            // Register User
            try {
                if(password !== password2) return res.render('auth/setup', {errors: ["passwords do not match"],  username, email, password, password2});

                await this.AdminModel.deleteMany({})

                //save new admin to databse
                const adminData = {username, email};

                //Hash Password
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(password, salt);

                adminData.password = hash;

                let adminUser = await new this.AdminModel(adminData);

                await adminUser.save();

                //send a flash message
                req.flash('success', 'Setup Successful!');
                return res.redirect(this.LOGIN_ROUTE);

            }catch(error){
                next(error);
            }
                        
    }
    
}


module.exports = SetupController;