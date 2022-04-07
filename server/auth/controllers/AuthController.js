const AdminModel = require('../models/AdminModel');

class AuthController{
    ADMIN_HOME = '/admin/';
    LOGIN_ROUTE = '/admin/auth/login';
    SETUP_ROUTE = '/admin/auth/setup';

    constructor(){
        this.AdminModel = AdminModel;
    }
}


module.exports = AuthController;