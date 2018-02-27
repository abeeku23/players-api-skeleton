var mongoose = require('mongoose');

var PlayerID = new extractPlayerID();

var PlayerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    required: true
  },
  last_name: {
    type: String,
    unique: true,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  handedness: {
    type: String,
    required: true
  },
  created_by: String
});
mongoose.model('Player', PlayerSchema);
module.exports = mongoose.model('Player');

function extractPlayerID() {
  return {
    toJSON: {
      transform: function (doc, ret, playerID) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      }
    }
  };
}
