const AuthController = require('./AuthController');
const logger = require('../../../app/logger');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/AdminModel');
const { exitOnError } = require('../../../app/logger');



class LoginController extends AuthController {
    
    /*
    *  @description Login Route
    *  @method GET /
    */
    constructor(){
        super(AdminModel);
    }
   
    getLogin = async (req, res, next) => {
       try{
        const sessionAdmin = req.session.admin;
        if (sessionAdmin) return res.redirect(this.ADMIN_HOME);

        let isAdminExisting = await this.AdminModel.exists();
        if(!isAdminExisting) return res.redirect(this.SETUP_ROUTE);

        let admin = await this.AdminModel.findOne({});

        return res.render('auth/login', {username: admin.username, errors: false});

       }
       catch(error){
         next(error);
       }

    }
       

    /*
    *  @description Login Route
    *  @method POST /
    */
    postLogin = async (req, res, next) => {
        try{
            const { username, password } = req.body;
            let validationErrors = [];
            
            let admin = await this.AdminModel.findOne({ username: username });

            // Check Password
            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if (err) next(err);

                if (!isMatch) {
                    validationErrors.push('Incorrect Password');
                    res.render('auth/login', {
                        username: req.body.username,
                        password: req.body.password,
                        errors:validationErrors,
                    });
                } else {
                    //render flash messages
                    req.flash('success', 'You are logged in!');
                    req.session.admin = admin.username;
                    res.redirect(this.ADMIN_HOME);
                }
            });
        } 
        catch (error) {
            next(error);
        }
    };



}

module.exports = LoginController;
