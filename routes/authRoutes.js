const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

router.get("/login", pagesController.showLogin);
router.post("/login", authController.login);
router.get("/users/signUp", pagesController.showSignUp);
router.post("/users/signUp", authController.signUp);
router.get("/logout", authController.logOut);

module.exports = router;
