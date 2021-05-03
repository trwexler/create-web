const postController = require("../controllers/post.controller");

// add in the JWT middleware function "authenticate" - we named it in jwt.config.js
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/post", authenticate, postController.viewAll);
    app.post("/api/post", authenticate, postController.create);
};