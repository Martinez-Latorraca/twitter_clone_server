const publicRoutes = require("./publicRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews);
  app.use("/users", userRoutes);
  app.use("/", publicRoutes);
  app.use("/", authRoutes);
};
