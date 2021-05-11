const userController = require("../controllers/user.controller");

// add in the JWT middleware function "authenticate" - we named it in jwt.config.js
const { authenticate } = require("../config/jwt.config");



module.exports = (app) => {


  app.put("/api/user/upload/:id", authenticate, userController.changePic);

  app.get("/api", authenticate, userController.viewAll);

  app.get("/api/user/:id", authenticate, userController.getOne);
  
  app.get("/api/user/web/:web", authenticate, userController.findMatchingWebUsers);//search for users who have web
  app.put("/api/user/:id", authenticate, userController.edit);
  app.post("/api/user/register", authenticate, userController.register);
  app.post("/api/user/login", authenticate, userController.login);
  app.post("/api/user/logout", authenticate, userController.logout);

};



// app.put("/api/user/upload/:id", authenticate, userController.changePic);

// app.get("/api", authenticate, userController.viewAll);

// app.get("/api/user/:id", authenticate, userController.getOne);

// app.get("/api/user/web/:web", authenticate, userController.findMatchingWebUsers);//search for users who have web
// app.put("/api/user/:id", authenticate, userController.edit);
// app.post("/api/user/register", authenticate, userController.register);
// app.post("/api/user/login", authenticate, userController.login);
// app.post("/api/user/logout", authenticate, userController.logout);