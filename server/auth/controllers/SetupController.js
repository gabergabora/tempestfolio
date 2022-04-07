const AuthController = require('./AuthController');
const logger = require('../../../app/logger');
const Joi = require('joi');
const bcrypt = require('bcryptjs');


class SetupController extends AuthController {
    /*
    *  @description SETUP Route
    *  @method GET /
    */
    getSetup = (req, res) => {
        this.AdminModel.findOne({ mailVerified: true })
            .then((document) => {
                if (document) return res.redirect(this.LOGIN_ROUTE);

                res.render('auth/setup', {
                    errors: undefined,
                });
            })
            .catch((err) => {
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
            password: Joi.string().min(6),
            password2: Joi.ref('password')
        })

        try{
            const value = schema.validateAsync({ username, email, password, password2 });
        }
        catch(error){
    
          const {_original, details} = error;
          const errorMessage =  (details[0]['message']).replace(/\"/g, "");
    
          return console.log(error, errorMessage);
        }

        return console.log(validationPassed);
        //check if error
        // if (errors.length > 0) {
        //     return res.render('auth/setup', {
        //             errors: errors,
        //             username,
        //             email,
        //             password,
        //             password2,
        //     });
        // } else {
        //clear database off unverified accounts
        AdminModel.deleteMany({}).catch((err) => console.log(err));
        //save new user to databse
        const adminUser = new AdminModel({
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
                        return res.redirect('/admin/auth/login');
                    })
                    .catch((err) => logger.error(error.toString(), __filename));
            });
        });
    };


    
}


module.exports = SetupController;