/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
// const User = require('../models/User');

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
//const config = require('../config');



function validateBearerToken(req, res, next) {
  let bearerToken;
  let bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];
    req.token = bearerToken;
    //console.log(bearerToken);
    next();
  } else {
    res.status(403).send();
  }
}



// router.post('/', function(req, res) {
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {
//     if (err) return res.status(500).send('Error on the server.');
//     if (!user) return res.status(404).send('No user found.');
//     const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//     if (!passwordIsValid) {
//       return res.status(401).send({
//         auth: false,
//         token: null
//       });
//     }

//     const token = jwt.sign({
//       id: user._id
//     }, process.env.JWT_SECRET, {
//       expiresIn: 86400 // expires in 24 hours
//     });
//     res.status(200).send({
//       auth: true,
//       token: token
//     });
//   });
// });

module.exports = router;
