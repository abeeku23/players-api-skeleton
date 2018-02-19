/*jshint esversion: 6 */

// module.exports = {
//   Player: {},
//   User: {}
// };


var express = require('express');
var app = express();
var db = require('../db');

// var UserController = require('./UserController');
// app.use('/api/user', UserController);

//change this to 'api/user'
var AuthController = require('../auth/AuthController');
app.use('/api/auth', AuthController);

var PlayerController = require('../models/PlayerController');
app.use('api/players', PlayerController);

module.exports = app;
