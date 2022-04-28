const express = require('express');

function bodyparser(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
}

module.exports = bodyparser; 