/*
 * Node Modules Requirements
 */
var express = require('express');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = require("./knexfile");
var knex = require('knex')(config[env]);
var bodyParser = require('body-parser');
var port = process.env.NODE_ENV || 3001;

/*
 * Express Requirements
 */
var app = express();
app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

/*
 * Routes
 */
app.get('/', function(req,res) {
  res.send();
});

app.post('/create-user', function(req,res) {
  console.log(req.body);
  var user = req.body.user;
  console.log("TEST",user);
  knex('users').insert({username: user.username, email: user.email})
               .then(function(data) {
                 console.log(data);
                 res.json(data);
               });
});

app.get('/users', function(req,res) {
  knex('users').select('*')
               .then(function(data) {
                 console.log('GETTING USERS', data);
                 res.json(data);
               });
});


app.listen(port, function() {
  console.log("We are listening on port:", port);
});
