/*jshint sub:true*/
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
var Player = require('../models/Player');
var User = require('../models/User');

//Creates Player with a bearer token
router.post('/', ensureAuthorized, function (req, res) {

  Player.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rating: req.body.rating,
      handedness: req.body.handedness,
      created_by: req.body.created_by
    },
    function (err, player) {
      if (err) {
        return res.status(409).send('There was a problem adding the player.');
      }
      res.status(201).send({
        success: true,
        player
      });
    });
});

function ensureAuthorized(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send();
  }
}

//Gets all players scoped to a user
router.get('/', ensureAuthorized, function (req, res) {
  Player.find({created_by: User.userID}, function (err, players) {
    if (err) return res.status(409).send('There was a problem finding the players.');
    res.status(200).send({
      success: true,
      players
    });
  });
});


//Deletes a player
router.delete('/:id', ensureAuthorized, function (req, res) {
  Player.findByIdAndRemove(req.params.id, User.userID,
    function (err, player) {
      if (err) {
        return res.status(404).send('There was a problem deleting the player.');
      }
      res.status(200).send({
        success:true,
        'Player ' : player.first_name + ' ' + player.last_name + ' was deleted.'});
    });
});


module.exports = router;
