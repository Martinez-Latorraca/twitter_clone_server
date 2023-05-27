const passport = require("passport");
const User = require("../models/User");

module.exports = function (app) {
  app.use(passport.session());

  require("./local")(passport);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).populate("tweets");
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
