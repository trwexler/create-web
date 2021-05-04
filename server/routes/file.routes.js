const fileController = require("../controllers/file.controller");

// add in the JWT middleware function "authenticate" - we named it in jwt.config.js

module.exports = (app) => {
    app.post("/api/upload", fileController.getFile);
};