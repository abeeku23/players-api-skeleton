/*jshint esversion: 6 */
// TODO

//module.exports = {};


const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://apiskeleton:nana@ds235418.mlab.com:35418/playerapiskeleton');
// const db = require('../db');

const UserController = require('./controllers/UserController');
app.use('/api/user', UserController);
//should handle login
app.use('/api', UserController);

const PlayerController = require('./controllers/PlayerController');
app.use('/api/players', PlayerController);

//const app = require('./models/index');
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = server;
