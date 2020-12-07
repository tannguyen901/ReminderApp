let database = require("../database");


let authController = {
  login: (req, res) => {
    res.locals.page = "login"
    res.render('auth/login')
  },

  register: (req, res) => {
    let mail = req.query.email
    res.locals.page = "register"
    res.render('auth/register', {email: mail})
  },

  loginSubmit: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (database.users[username] && database.users[username].password === password) {
      req.session['user']= username;
      const friends_array = database.users[username].friends
      let friends_reminders = {}
      for(friend of friends_array){
        let reminder = database.reminders[friend]
        friends_reminders[friend] = reminder
      }
      res.locals.page = "reminders";
      res.render('reminder/index', {reminders: database.reminders[username].reminders,  friends: friends_reminders});
    } else {
      res.redirect('/');
    }
  },
  
  registerSubmit: (req, res) => {
    if (req.body.username && req.body.password) {
      const username = req.body.username
      database.users[username] = {username: username, password: req.body.password, friends:[]};
      database.reminders[username] = {reminders: []}
      req.session['user'] = username;
      res.locals.page = "reminders"
      const friends_array = database.users[username].friends
      let friends_reminders = {}
      for(friend of friends_array){
        let reminder = database.reminders[friend]
        friends_reminders[friend] = reminder
      }
      res.locals.page = "reminders";
      res.render('reminder/index', {reminders: database.reminders[username].reminders,  friends: friends_reminders});
    } else {
      res.status(400);
      res.send('invalid user');
    }
  },
  user: (req,res,next) => {
    if (req.session.user){
      req.user = database.users[req.session.user];
      next();
    } else{
      next()
    }
  },
  logout:(req,res) => {
    req.session = null
    res.locals.page = "login"
    res.render('auth/login')
  }
}

module.exports = authController;