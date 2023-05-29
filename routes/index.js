const publicRoutes = require("./publicRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const makeUserAvailable = require("../middlewares/makeUserAvailable");

module.exports = (app) => {
  app.use("/", publicRoutes);
  app.use("/", authRoutes);
  app.use("/users", userRoutes);
};
