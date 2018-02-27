var mongoose = require('mongoose');

var userID = extractuserID();

var UserSchema = new mongoose.Schema({
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

