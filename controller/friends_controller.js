let database = require("../database");

let friendsController = {
    list: (req,res) =>{
        username = req.session['user']
        not_friends = []
        for (person of Object.keys(database.users)){
            if(!database.users[username].friends.includes(person)){
                if(person !== username){
                    not_friends.push(person)
                }
            }
        }
        res.locals.page = "friends"
        res.render('reminder/friends',{notFriendList : not_friends})
    },
    add: (req,res) =>{
        person = req.body.person
        database.users[req.session['user']].friends.push(person)
        res.redirect('/friends')
    }
}

module.exports = friendsController