var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  rating: String,
  handedness: String,
  enum: ['left' | 'right'],
  created_by: String
});
mongoose.model('Player', UserSchema);
module.exports = mongoose.model('Player');
