const AuthController = require('./AuthController');
const logger = require('../../../app/logger');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/AdminModel');



class LoginController extends AuthController {
    
    /*
    *  @description Login Route
    *  @method GET /
    */
    constructor(){
        super(AdminModel);
    }
   
    getLogin = (req, res) => {
        const admin = req.session.admin;
        
        if (admin) return res.redirect(this.ADMIN_HOME);

        this.AdminModel.exists()
            .then((result) => {
                if (!result) {
                    res.redirect(this.SETUP_ROUTE);
                } else {
                    this.AdminModel.findOne({})
                        .then((admin) => {
                            res.render('auth/login', {
                                username: admin.username,
                                errors: false,
                            });
                        })
                        .catch((error) =>  logger.error(error.toString(), __filename));
                }
            })
            .catch((error) => logger.error(error.toString(), __filename));
    };


    /*
    *  @description Login Route
    *  @method POST /
    */
    postLogin = (req, res) => {
        let errors = [];

        const { username, password } = req.body;
        this.AdminModel.findOne({ username: username })
            .then((admin) => {
                // Check Password
                bcrypt.compare(password, admin.password, (err, isMatch) => {
                    if (err) throw err;

                    if (!isMatch) {
                        errors.push('Incorrect Password');
                        res.render('auth/login', {
                            username: req.body.username,
                            password: req.body.password,
                            errors,
                        });
                    } else {
                        //render flash messages
                        req.flash('success', 'You are logged in!');
                        req.session.admin = admin.username;
                        res.redirect(this.ADMIN_HOME);
                    }
                });
            })
            .catch((error) => logger.error(error.toString(), __filename));
    };



}

module.exports = LoginController;
