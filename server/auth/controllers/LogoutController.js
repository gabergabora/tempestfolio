const AuthController = require('./AuthController');


class LogoutController extends AuthController {
    logout = (req, res, next) => {
        try{
            // delete session
            req.session.admin = null;

            // flash message and user to login page
            req.flash('success', 'Logged Out Successfully');
            res.redirect(this.LOGIN_ROUTE);

        }
        catch(error){
            next(error);
        }
     
    }
}

module.exports = LogoutController;