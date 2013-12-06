// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var request = require('request');

// global config
var app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// env config
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/searching', function(req, res){
  var city = req.query.city;
  var language = req.query.language;
  var url = 'https://api.github.com/legacy/user/search/location:' + city
  var request_options = {
    url: url,
    headers: {'user-agent': 'git-match'},
  };	
  request(request_options, function(err, resp, body) {
    body = JSON.parse(body);
    if (Object.keys(body.users).length > 0) {
      city_results = "body.users";
    } else {
      city_results = "No results found. Try again.";
    }
    res.send(city_results);
  });
});

// run server
app.listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});
