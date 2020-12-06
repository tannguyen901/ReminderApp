let database = require("../database");


let remindersController = {
  list: (req, res) => {
    res.locals.page = "reminders"
    res.render('reminder/index', { reminders: database.reminders[req.session['user']].reminders })
  },

  new: (req, res) => {
    res.locals.page = "create"
    res.render('reminder/create')
    
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.reminders[req.session['user']].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    if (searchResult != undefined) {
      res.locals.page = "reminders"
      res.render('reminder/single-reminder', { reminderItem: searchResult })
    } else {
      res.locals.page = "reminders"
      res.render('reminder/index', { reminders: database.reminders[req.session['user']].reminders })
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.reminders[req.session['user']].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      tags: req.body.tags.split(","),
      subtasks: req.body.subtasks.split(",")
    }
    res.locals.page = "create"
    database.reminders[req.session['user']].reminders.push(reminder);
    res.redirect('/reminders');
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.reminders[req.session['user']].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    console.log(searchResult)
    res.locals.page = "reminders"
    res.render('reminder/edit', { reminderItem: searchResult })

  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.reminders[req.session['user']].reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title,
        reminder.tags = req.body.tags.split(','),
        reminder.subtasks = req.body.subtasks.split(','),
        reminder.description = req.body.description,
        reminder.completed = req.body.completed == "true"
      }
    });
    res.locals.page = "reminders"
    res.redirect('/reminder/' + reminderToFind)
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let reminderIndex = database.reminders[req.session['user']].reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    })
    database.reminders[req.session['user']].reminders.splice(reminderIndex, 1);
    res.locals.page = "reminders"
    res.redirect('/reminders');
  }
}

module.exports = remindersController;
