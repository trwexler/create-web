const documentController = require("../controllers/document.controller");

// add in the JWT middleware function "authenticate" - we named it in jwt.config.js
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {

    //grabs all documents regardless of user.
    app.get("/api/document", authenticate, documentController.viewAll);

    //grabs one specific document by id
    app.get("/api/document/:id", authenticate, documentController.getOne);

    //grabs all documents by a single user based on user_id
    app.get("/api/document/user/:user_id", authenticate, documentController.viewUserDocuments);

    //creates a new post... MAY HAVE TO BE SPECIFIC TO USER. WILL SEE.
    app.post("/api/document", authenticate, documentController.create);
};