var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// Users
var users = {
  'marc':'1234',
  'root':'toor',
}

app.get('/login', function (req, res) {
  res.render('login_form');
});

app.post('/login', function (req, res) {
  var user = "";
  var inputUser = req.body.username;
  if (localStorage.getItem(inputUser) == req.body.password) {
    user = inputUser;
  }
  res.render('login_formPOST', {user:user});
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {
  localStorage.setItem(req.body.username, req.body.password);
  res.redirect('/login');//res.render('register');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
