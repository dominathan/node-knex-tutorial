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
  // res.send();
});

app.post('/create-blog', function(req,res) {
  var blog = req.body.blog;
  console.log("TRYING POST", req.body);
  knex('posts').insert({title: blog.title, body: blog.body, user_id: blog.user_id},'*')
               .then(function(data) {
                 console.log("CREATED BLOG", data);
                 res.sendStatus(301);
               });
});

app.get('/blogs', function(req,res) {
  knex('posts').select('*')
               .then(function(posts) {
                 res.json(posts);
               });
});

app.get('/user-blogs/:user_id', function(req,res) {
  var userId = req.params.user_id;
  knex('posts').select('*')
               .where('user_id', userId)
               .then(function(data) {
                 res.json(data);
               });
});

app.post('/create-user',function(req,res) {
  var user = req.body.user;
  knex('users').insert({username: user.username, email: user.email})
               .then(function(data) {
                 res.json(data);
               });
});

app.get('/users',function(req,res) {
  knex('users').select('*')
               .then(function(data) {
                 console.log('GETTING USERS', data);
                 res.json(data);
               });
});


app.listen(port, function() {
  console.log("We are listening on port:", port);
});
