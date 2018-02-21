/*jshint sub:true*/
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
var Player = require('../models/Player');

//Creates Player with a bearer token
router.post('/', ensureAuthorized, function (req, res) {

  Player.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rating: req.body.rating,
      handedness: req.body.handedness,
      created_by: req.body.req.created_by
    },
    function (err, player) {
      if (err) {
        return res.status(500).send('There was a problem adding the player.');
      }
      res.status(200).send({
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
    res.send(403);
  }
}

//Gets all players scoped to a user
router.get('/:created_by_id', ensureAuthorized, function (req, res) {
  Player.find({}, function (err, players) {
      if (err) return res.status(500).send('There was a problem finding the users.');
      res.status(200).send({
        success: true,
        players
      });
  });
});


//Deletes a player
router.delete('/:id', ensureAuthorized, function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, player) {
    if (err) return res.status(500).send('There was a problem deleting the player.');
    res.status(200).send('Player ' + player.first_name + ' ' + player.last_name + ' was deleted.');
  });
});
