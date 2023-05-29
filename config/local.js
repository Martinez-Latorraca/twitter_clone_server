const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
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
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
          });
          return done(null, user, { token });
        } catch (error) {
          // console.log(error);
        }
      },
    ),
  );
};
