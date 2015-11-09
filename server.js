var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use(express.static(__dirname + '/client'));
//mongoose.connect('mongodb://localhost/shortly'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
//require('./config/middleware.js')(app, express);

app.listen(8000);

module.exports = app;