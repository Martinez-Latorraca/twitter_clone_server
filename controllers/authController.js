const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

function login(req, res) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err); // Imprime el error en la consola para ver más detalles
      req.flash("info", "Error de autenticación: " + err.message); // Agrega un mensaje de flash con el error
      return res.redirect("/login");
    }

    if (!user) {
      req.flash("info", "Credenciales incorrectas, intenta nuevamente.");
      return res.redirect("/login");
    }

    req.logIn(user, function (err) {
      if (err) {
        console.log(err); // Imprime el error en la consola para ver más detalles
        req.flash("info", "Error de autenticación: " + err.message); // Agrega un mensaje de flash con el error
        return res.redirect("/login");
      }
      return res.redirect("/");
    });
  })(req, res);
}

async function signUp(req, res) {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    req.flash("info", "This user is already registered");
    return res.redirect("/users/signUp");
  } else {
    const newUser = await User.create({
      email: req.body.email,
      fullname: req.body.fullname,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    req.login(newUser, () => {
      return res.redirect("/");
    });
  }
}

async function logOut(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/login");
  });
}

module.exports = { login, signUp, logOut };
