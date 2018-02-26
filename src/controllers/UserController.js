/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
var User = require('../models/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// CREATES A NEW USER
router.post('/', function (req, res) {

  var userdata = req.body || {};
  var hashedPassword = bcrypt.hashSync(userdata.password, 8);

  User.create({
      first_name: userdata.first_name,
      last_name: userdata.last_name,
      email: userdata.email,
      password: hashedPassword
      //confirm_password: req.body.confirm_password
    },
    function (err, user) {
      // if (!userdata.hasOwnProperty('email'))
      //   return res.status(500).send('First name not present');
      // if (!userdata.hasOwnProperty('last_name'))
      //   return res.status(500).send('Last name not present');
      // if (!userdata.hasOwnProperty('email'))
      //   return res.status(500).send('Email not present');

      if (err) return res.status(409).send('There was a problem adding the information to the database.');
      
      //if(this.password !== User.confirm_password) return res.status(500).send('The passwords do not match');

      var token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(201).send({
        success: true,
        user,
        token: token
      });
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(409).send('There was a problem finding the users.');
    res.status(200).send(users);
  });
});


router.post('/login', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({
      auth: false,
      token: null
    });
    var token = jwt.sign({
      id: user._id
    }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      success: true,
      user,
      token: token
    });
  });
});

// router.get('/logout', function (req, res) {
//   res.status(200).send({
//     auth: false,
//     token: null
//   });
// });


// GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', function (req, res) {
//   User.findById(req.params.id, function (err, user) {
//     if (err) return res.status(409).send('There was a problem finding the user.');
//     if (!user) return res.status(404).send('No user found.');
//     res.status(200).send(user);
//   });
// });

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:userId', function (req, res) {

  User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true
  }, function (err, user) {
    if (err) return res.status(409).send('There was a problem updating the user.');
    res.status(200).send(user);
  });
});

module.exports = router;
