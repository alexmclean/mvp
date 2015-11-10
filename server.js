var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Team = require('./client/app/models/teamModel');

var app = express();
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/quicksport'); // connect to mongo database named shortly
var teamRouter = express.Router();
app.use('/api/teams', teamRouter);

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

      Team.findOne({teamName : teamName})
        .then(function (match){
          if(match){
            res.send(match);
          } else {
            return Team.create({
              teamName: teamName
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

app.listen(8000);

module.exports = app;