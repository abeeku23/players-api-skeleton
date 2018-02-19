var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
var User = require('../models/Player');

//Creates Player with a token
router.post('/players', function (req, res) {

  var token = req.headers['x-access-token'];

});


//Gets all players scoped to a user
router.get('/players', function (req, res) {

});


//Deletes a player
router.delete('/players/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User " + user.name + " was deleted.");
  });
});
