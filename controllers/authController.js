const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

function login(req, res) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      req.flash("info", "Error de autenticación: " + err.message); // Agrega un mensaje de flash con el error
      return res.status(401).send("Bad Credentials");
    }

    if (!user) {
      req.flash("info", "Credenciales incorrectas, intenta nuevamente.");
      return res.status(401).send("Bad Credentials");
    }

    req.logIn(user, function (err) {
      if (err) {
        req.flash("info", "Error de autenticación: " + err.message); // Agrega un mensaje de flash con el error
        return res.status(401).send("Bad Credentials");
      }
      const token = info.token;
      const userToFront = { ...user._doc, token: token }; // Asigno el user para quitarle el pass y agregar el token para mandarlo al front
      delete userToFront.password;
      return res.json(userToFront);
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
    console.log("loged out");
    return res.redirect("/login");
  });
}

module.exports = { login, signUp, logOut };
