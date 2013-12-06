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

// search github
app.get('/searching', function(req, res){
  var city = req.query.city;
  var url = 'https://api.github.com/legacy/user/search/location:' + city
  var request_options = {
    url: url,
    headers: {'user-agent': 'git-match'},
  };	
  request(request_options, function(err, resp, body) {
    body = JSON.parse(body);
    // search result logic
    if (body.message)   {
      var city_results = "Sorry. The API rate limit has been exceeded. Run along now."
    } else if (Object.keys(body.users).length > 0) {
      var randNum = Math.floor(Math.random() * Object.keys(body.users).length)
      var results = body.users[randNum].username;
      var fullname = body.users[randNum].fullname;
      var gravatar = body.users[randNum].gravatar_id;
      var location = body.users[randNum].location;
      var language = body.users[randNum].language;
      var repos = body.users[randNum].repos;
      var followers = body.users[randNum].followers;
      var city_results = '<a href ="http://www.github.com/'+results+'">'+fullname+'</a><br>' +
        '<img src="https://secure.gravatar.com/avatar/' + gravatar + '"><br>' +
        location + '<br>' +
        language + '<br>' +
        repos + ' repos <br>' +
        followers + ' followers'
    } else {
      var city_results = "No results found. Try again.";
    }
    // send data back to client
    res.send(city_results);
    console.log(city_results)
  });
});

// run server
app.listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});
