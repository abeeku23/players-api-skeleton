/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const Player = require('../models/Player');
//const auth = require('../auth/AuthController');
//const User = require('../models/User');

//Creates Player with a bearer token
router.post('/', validateBearerToken, function(req, res) {
  Player.create({first_name: req.body.first_name, last_name: req.body.last_name, rating: req.body.rating, handedness: req.body.handedness, created_by: getUserFromBearerToken(req.token)
  }, function(err, player) {
    if (err) {
      return res.status(409).send('There was a problem adding the player.');
    }
    res.status(201).send({success: true, player});
  });
});

function validateBearerToken(req, res, next) {
  let bearerToken;
  let bearerHeader = req.headers.authorization || req.headers['x-access-token'];
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split('Bearer ');
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send();
  }
}

function getUserFromBearerToken(token) {
  const decodedtoken = jwt.decode(token, process.env.JWT_SECRET);
  return decodedtoken.id;
}


//Gets all players scoped to a user
router.get('/', validateBearerToken, function(req, res) {
  Player.find({
    created_by: getUserFromBearerToken(req.token)
  }, function(err, players) {
    if (err) return res.status(409).send('There was a problem finding the players.');
    res.status(200).send({
      success: true,
      'players': players
    });
  });
});


//Deletes a player
/*
- Find player object in the db
- return and check the `created_by` attribute
- compare with the token id of the logged in user
- if not the same the player cannot be deleted
- else execute deletion
*/
router.delete('/:id', validateBearerToken, function(req, res) {
  let playerId = req.params.id;
  // let player = Player.find({created_by: playerId
  // }, function(err) {
  //   if (err) return res.status(409).send('There was a problem finding the player.');
  // });
  // console.log(player.created_by);
  // // console.log(getUserFromBearerToken(req.token));
  // if (player.created_by !== getUserFromBearerToken(req.token)) {
  //   return res.status(404).send('The player not created by this user');
  // }
  Player.findByIdAndRemove(playerId, function(err) {
    if (err) {
      return res.status(404).send('There was a problem deleting the player.');
    }
    res.status(200).send({
      success: true
    });
  });
});

module.exports = router;
