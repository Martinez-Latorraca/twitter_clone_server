function isOwner(req, res, next) {
  if (req.user === user.tweet.author) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    console.log("no tienes permisos");
    res.redirect("/");
  }
}
module.exports = isOwner;
