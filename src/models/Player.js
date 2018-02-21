var mongoose = require('mongoose');
var PlayerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  rating: String,
  handedness: String,
  created_by: String
});
mongoose.model('Player', PlayerSchema);
module.exports = mongoose.model('Player');
