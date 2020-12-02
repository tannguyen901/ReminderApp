module.exports = function(req, res, next) {
    if (req.user) {
      console.log(req.user)
      next();
    } else {
      res.redirect("/");
    }
  }