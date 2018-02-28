
/*jshint esversion: 6 */
const mongoose = require('mongoose');

const userID = extractuserID();

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
},userID);
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');

//make the auto generated ID the ID to be used for other functionality
function extractuserID() {
  return {
    toJSON: {
      transform: function (doc, ret, userID) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      }
    }
  };
}

