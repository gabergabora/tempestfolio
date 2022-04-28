/**
 * Add request and response dedicated classes
 */
class AuthController{
    ADMIN_HOME = '/admin/';
    LOGIN_ROUTE = '/auth/login';
    SETUP_ROUTE = '/auth/setup';

    constructor(AdminModel = null){
        if(AdminModel){
            this.AdminModel = AdminModel;
        }
    }
}


module.exports = AuthController;