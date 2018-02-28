/*jshint esversion: 6 */
// TODO

//module.exports = {};

const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGOLAB_URI;

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(url);

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
