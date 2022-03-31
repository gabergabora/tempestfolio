require('dotenv').config();

const createError = require('http-errors');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// My modules
const mongooseConnect = require('./core/mongooseConnect');

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const morganLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'morgan.log'), { flags: 'a' })


// Database
mongooseConnect.connectAtlas(MONGO_URI);

// view engine setup/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
// Morgan
app.use(morgan('combined', { stream: morganLogStream }))
// log to console if on development
if(process.env.NODE_ENV != "production") app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
	})
);
app.use(flash());
app.use(cookieParser());

//Global variables

let globalJsonVariables = fs.readFileSync('./globals.json');
let globals = JSON.parse(globalJsonVariables);

//Global vars
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err);
  res.locals.message = "A server error occured. Please contact site owner";
  res.locals.error = req.app.get('env') === 'development' ? {} : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
