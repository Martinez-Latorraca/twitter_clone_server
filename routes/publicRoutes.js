const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const jwtVerify = require("../middlewares/jwtVerify");
const makeUserAvailable = require("../middlewares/makeUserAvailable");

router.get("/", jwtVerify, pagesController.showHome);

module.exports = router;
