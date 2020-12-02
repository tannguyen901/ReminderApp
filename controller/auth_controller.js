let database = require("../database");
const express = require("express");
const cookieSession = require('cookie-session');
const authCheck = require("../middleware/auth");

const app = express();app.use(cookieSession({
	name: 'session',
	keys: ['aaa', 'bbb', 'ccc'],
  maxAge: 10*24*3600*1000
}));

app.use(express.urlencoded({ extended: true}));
app.use(function(req, res, next) {
  if(req.session.user) {
    if (database[req.session.user]) {
      req.user = database[req.session.user];
      next();
    }
  } else {
    next();
  }
})

let authController = {
  login: (req, res) => {
    res.render('auth/login')
  },

  register: (req, res) => {
    let mail = req.query.email
    res.render('auth/register', {email: mail})
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    let username = req.body.username
    let password = req.body.password
    console.log('register', req.body)
    if (username && password) {
      database[username] = {username: username, password: password};
      req.session['user'] = username;
      res.redirect('/reminders');
    } else {
      res.status(400);
      res.send('invalid user');
    }
  }
}

module.exports = authController;
