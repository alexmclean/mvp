var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  teamName: String,
  sport:String,
  members: [{name: String, email: String}]
});

module.exports = mongoose.model('Team', teamSchema);