const AdminModel = require('../auth/models/AdminModel');
const logger = require('../../app/logger');

const LOGIN_ROUTE = '/auth/login';

const ensureVerifiedUser = (req, res, next) => {
	/*if  user is not authenticated  send to authentication page
	   else if user mail is not verified send to email verification page*/
	const admin = req.session.admin;
	if(!admin) return res.redirect(LOGIN_ROUTE);
	// call next middleware in stack
	next();
};

module.exports = ensureVerifiedUser;