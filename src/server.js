// TODO

//module.exports = {};


var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://apiskeleton:nana@ds235418.mlab.com:35418/playerapiskeleton');
// var db = require('../db');

var UserController = require('./controllers/UserController');
app.use('/api/user', UserController);
//should handle login
app.use('/api', UserController);

var PlayerController = require('./controllers/PlayerController');
app.use('/api/players', PlayerController);

//var app = require('./models/index');
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = server;
