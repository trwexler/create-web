const Document = require('../models/document.model');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

module.exports = {


    create: (req, res) => {
        console.log(req.body);
        const document = new Document(req.body);
        const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });

        document.user_id = decodedJwt.payload._id;

        // craete a document in the document collection
        Document.create(document)
            .then((newDocument) => {
            console.log("in create");
            console.log(newDocument);

        // still need to update the Movie document to include this new document _id
        User.findByIdAndUpdate(newDocument.user_id, 
        // this is the data that we want to update
            {
            $push: { documents: newDocument._id } 
            }, 
            {
            new: true,  // give me the new version...not the original
            useFindAndModify: false,  // by default mongoose will replace the entire object
            })
            .populate("documents")
            // .populate("user_id")
                .then((updatedUserDocuments) => {
                    console.log("in document controller, update user documents");
                    // console.log(updatedMovie);
                    // res.json(newDocument);
                    res.json(updatedUserDocuments);
                    })
                .catch((err) => {
                    console.log("error found in add document to movie");
                    console.log(err);
                    res.status(400).json(err);
                })
        })
                .catch((err) => {
                console.log("error found in create document");
                console.log(err);
                res.status(400).json(err);
                })
    },

    viewUserDocuments: (req, res) => {
        Document.find({user_id: req.params.user_id})
                .then((userDocuments) => {
                    console.log("in all document");
                    // console.log(allComment);
                    res.json(userDocuments);
                    })
                .catch((err) => {
                    console.log("error found in view user documents");
                    res.status(400).json(err);
                })
    },
    
    viewAll: (req, res) => {
        Document.find({})
            // .sort({ documentDate : "descending" })
            // .sort({'_id': 'asc'})
            .populate("user_id")
            .then((allDocument) => {
                console.log("in all document");
                // console.log(allDocument);
                res.json(allDocument);
                })
            .catch((err) => {
                console.log("error found in getAll");
                res.status(400).json(err);
            })
    },

    getOne: (req, res) => {
        console.log(req.params.id);
        Document.findById(req.params.id)
            .then((oneDocument) => {
            console.log("in get one document");
            // console.log(oneMovie);
            console.log(res);
            res.json(oneDocument);
            })
            .catch((err) => {
            console.log("error found in getOne document");
            res.status(400).json(err);
            })
    },

    // edit: (req, res) => {
    //     console.log(req.params.id);
    //     Document.findByIdAndUpdate(req.params.id, {
    //         $inc: {likes : 1}
    //     }, {
    //         new: true,  // give me the new version...not the original
    //         runValidators: true,  // by default mongoose will NOT validate on updates,
    //         useFindAndModify: false,
    //     })
    //         .then((editedDocument) => {
    //             console.log("in edit document");
    //             res.json(editedDocument);
    //         })
    //         .catch((err) => {
    //         console.log("error found in edit document");
    //         res.status(400).json(err);
    //         })
    // },


}