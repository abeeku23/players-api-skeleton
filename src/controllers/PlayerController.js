/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
const Player = require('../models/Player');
const User = require('../models/User');

//Creates Player with a bearer token
router.post('/', validateBearerToken, function (req, res) {

  Player.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rating: req.body.rating,
      handedness: req.body.handedness,
      created_by: req.body.userID
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

function validateBearerToken(req, res, next) {
  let bearerToken;
  let bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send();
  }
}

//Gets all players scoped to a user
router.get('/', validateBearerToken, function (req, res) {
  //let players = [];
  Player.find({
    created_by: User.userID
  }, function (err, players) {
    if (err) return res.status(409).send('There was a problem finding the players.');
    
    // _.each(result, (player) => {
    //   players.push();
    // });

    res.status(200).send({
      success: true,
      'players': players
    });
  });
});


//Deletes a player
router.delete('/:id', validateBearerToken, function (req, res) {

  Player.findById({
    playerID: Player.playerID,
    created_by: Player.created_by
  }, function (err, player) {
    if (err) {
      return res.status(404).send('Player not found');
    }
    if (!player) {
      return res.status(404).send('Player does not exist');
    }
    Player.findByIdAndRemove(playerID, function (err) {
      if (err) {
        return res.status(404).send('Player not found to remove');
      }
    });
    res.status(200).send({
      success: true,
      'Player ': player.first_name + ' ' + player.last_name + ' was deleted.'
    });
  });
});


// Player.findByIdAndRemove(req.params.id, User.userID,
//   function (err, player) {
//     if (err) {
//       return res.status(404).send('There was a problem deleting the player.');
//     }
//     res.status(200).send({
//       success: true,
//       'Player ': player.first_name + ' ' + player.last_name + ' was deleted.'
//     });
//   });


module.exports = router;
