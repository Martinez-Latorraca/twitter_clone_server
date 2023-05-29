const User = require("../models/User");

async function showHome(req, res) {
  const tweets = [];
  console.log(req.user);
  const user = await User.findById(req.user.userId);

  for (let i = 0; i < user.following.length; i++) {
    const followingTweets = await User.findById(user.following[i]).populate("tweets");
    tweets.push(followingTweets.tweets);
  }

  res.json({ tweets: tweets });
}

async function showLogin(req, res) {
  res.send("pages/login");
}

async function showSignUp(req, res) {
  res.send("pages/signUp");
}

async function show404(req, res) {
  res.status(404).send("pages/404");
}

module.exports = {
  showHome,
  showLogin,
  showSignUp,
  show404,
};
