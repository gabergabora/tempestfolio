/** @format */

require("dotenv").config();
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");
const express = require("express");
const errorHandler = require("./app/errorhandler");

const app = express();

//database
require("./app/db").connect();

// Set node environment
app.set("env", process.env.NODE_ENV);

// view engine setup/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Morgan logger
require("./app/providers/morgan")(app);

//service providers
const serviceProviders = require("./app/serviceproviders");
serviceProviders(app);

//Global variables
let globalJsonVariables = fs.readFileSync("./globals.json");
let globals = JSON.parse(globalJsonVariables);

app.use((req, res, next) => {
  res.locals.errorMsg = req.flash("error") || false;
  res.locals.successMsg = req.flash("success") || false;
  res.locals.globals = globals;
  next();
});

//Set Public Folder
app.use("/", express.static(path.resolve(__dirname, "public/")));

//Router
const router = require(__dirname + "/server/routes/router");
router(app);

//Error handler

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(async function (err, req, res, next) {
  await errorHandler.handleError(err, req, res);
  next();
});

module.exports = app;
