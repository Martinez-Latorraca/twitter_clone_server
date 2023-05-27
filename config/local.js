const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  let checkPass;
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (email, password, done) {
        try {
          const user = await User.findOne({ $or: [{ email: email }, { username: email }] });
          user ? (checkPass = await bcrypt.compare(password, user.password)) : null;
          if (!user || !checkPass) {
            return done(null, false, { message: "Credenciales incorrectas" });
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
        }
      },
    ),
  );
};
