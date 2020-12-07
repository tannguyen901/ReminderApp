const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const friendsController = require("./controller/friends_controller.js");
const authCheck = require("./middleware/auth");
const cookieSession = require('cookie-session');
app.use(cookieSession({
	name: 'session',
	keys: ['aaa', 'bbb', 'ccc'],
  maxAge: 10*24*3600*1000
}));



app.use(authController.user);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Site Routes start here

// Landing page

// Get a list of all reminders
app.get("/reminders", authCheck, reminderController.list)

// Create a Reminder
app.get("/reminder/new", authCheck, reminderController.new)
app.post("/reminder/", authCheck, reminderController.create)

// Show one single reminder
app.get("/reminder/:id",authCheck, reminderController.listOne)

// Edit a reminder
app.get("/reminder/:id/edit",authCheck, reminderController.edit) // Show the page to edit a reminder
app.post("/reminder/update/:id", authCheck, reminderController.update) // Edit the reminder

// Delete a reminder
app.post("/reminder/delete/:id", authCheck, reminderController.delete)

app.get("/register", authController.register);
app.get("/login", authController.login);
app.get("/logout", authController.logout);

app.get("/friends", friendsController.list);
app.post("/friends", friendsController.add);

app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3000, function () {
  console.log("Server running. Visit: localhost:3000/reminders in your browser 🚀");
});
