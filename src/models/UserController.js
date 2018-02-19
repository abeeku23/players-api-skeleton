/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
var User = require('./User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

module.exports = router;


// CREATES A NEW USER
router.post('/', function (req, res) {
  User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      //confirm_password: req.body.confirm_password
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      //if(this.password !== User.confirm_password) return res.status(500).send("The passwords do not match");
      var token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({
        success: true,
        user,
        //auth: true,
        token: token
      });
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});
module.exports = router;

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, user) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send(user);
  });
});

// DELETES A USER FROM THE DATABASE
//Initially put in as a test but would not be needed for this challenge specifically

// router.delete('/:id', function (req, res) {
//   User.findByIdAndRemove(req.params.id, function (err, user) {
//     if (err) return res.status(500).send("There was a problem deleting the user.");
//     res.status(200).send("User " + user.name + " was deleted.");
//   });
// });
