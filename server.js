var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Team = require('./client/app/models/teamModel');

var app = express();
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
// connect to mongo database named quicksport
mongoose.connect('mongodb://localhost/quicksport');
var teamRouter = express.Router();
var playerRouter = express.Router();
app.use('/api/teams', teamRouter);
app.use('/api/players', playerRouter);

teamRouter.route('/')
    //GET method for teams 
    .get(function (req, res, next) {

      Team.find({})
        .then(function (teams) {
          res.json(teams);
        })
        .catch(function (error) {
          console.log("whoops");
          next(error);
        });
      })
    //POST method for teams
    .post(function (req, res, next){
      console.log("posting ", req.body.teamName);
      var teamName = req.body.teamName;
      var sport = req.body.sport;

      Team.findOne({teamName : teamName})
        .then(function (match){
          if(match){
            res.send(match);
          } else {
            return Team.create({
              teamName: teamName,
              sport: sport,
              members: []
            });
          }
        })
        .then(function (createdTeam){
          if(createdTeam){
            res.json(createdTeam);
          }
        })
        .catch(function (err){
          console.log("failed", err);
          next(err);
        });
    });
//POST to add players
playerRouter.route('/')
  .post(function (req, res, next){
    var team = req.body.team;
    var teammate = req.body.player;
    return Team.update({_id: team._id}, 
      {$push: {members: {name: teammate.name, email: teammate.email, paid: false}}},
      {safe: true, upsert: true},
    function(err, model) {
      if(err){
        console.log(err);
      }
      return model;
    });
  });
//POST to update payment status
playerRouter.route('/update')
  .post(function (req, res, next) {
    var team = req.body.team;
    var player = req.body.playerIndex;
    return Team.find({_id: team._id})
      .then(function (found){
        var team = found[0];
        team.members[player].paid = !team.members[player].paid;
        return team;
      })
      .then(function (modifiedModel){
        modifiedModel.save(function (err, model){
          return model;
        });
      });
  });

app.listen(8000);

module.exports = app;