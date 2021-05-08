const userController = require("../controllers/user.controller");

// add in the JWT middleware function "authenticate" - we named it in jwt.config.js
const { authenticate } = require("../config/jwt.config");



module.exports = (app) => {

  app.get("/api", userController.viewAll);
  app.get("/api/user/:id", userController.getOne);
  app.get("/api/user/web/:web", userController.findMatchingWebUsers);//search for users who have web

  app.put("/api/user/:id", userController.edit);

  app.post("/api/user/register", userController.register);
  app.post("/api/user/login", userController.login);
  app.post("/api/user/logout", userController.logout);

};
