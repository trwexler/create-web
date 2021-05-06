const commentController = require("../controllers/comment.controller");

// add in the JWT middleware function "authenticate" - we named it in jwt.config.js
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/comment", authenticate, commentController.viewAll);
    app.post("/api/comment", authenticate, commentController.create);
};