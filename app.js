require('dotenv').config();
// require('express-group-routes');

const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

//database
(require('./app/db')).connect();

// view engine setup/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Morgan logger
(require('./app/providers/morgan'))(app);

//service providers
const serviceProviders = require('./app/serviceproviders');
serviceProviders(app);

//Global variables
let globalJsonVariables = fs.readFileSync('./globals.json');
let globals = JSON.parse(globalJsonVariables);

app.use((req, res, next) => {
	res.locals.errorMsg = req.flash('error') || false;
	res.locals.successMsg = req.flash('success') || false;
	res.locals.globals = globals;
	next();
});


//Set Public Folder
app.use('/', express.static(path.resolve(__dirname, 'public/')));

//Router
const router = require(__dirname + '/server/routes/router');
router(app);

//Error handle
const errorHandler = require('./app/errorhandler');
errorHandler(app);

module.exports = app;
