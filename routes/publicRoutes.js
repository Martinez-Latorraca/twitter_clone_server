const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/", pagesController.showHome);
router.get("/login", pagesController.showLogin);
router.get("/signup", pagesController.showSignUp);

module.exports = router;
