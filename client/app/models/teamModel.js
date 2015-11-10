var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  teamName: String,
  sport:String,
  members: [{name: String, email: String, paid: Boolean}]
});
//db.runCommand({dropDatabase: 1})
module.exports = mongoose.model('Team', teamSchema);