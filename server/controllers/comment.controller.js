const Comment = require('../models/comment.model');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

module.exports = {
    viewAll: (req, res) => {
        Comment.find({})
            // .sort({ commentDate : "descending" })
            // .sort({'_id': 'asc'})
            .populate("posting_user_id")
                .then((allComment) => {
                    console.log("in all comment");
                    // console.log(allComment);
                    res.json(allComment);
                    })
                .catch((err) => {
                    console.log("error found in viewAll comment");
                    res.status(400).json(err);
                })
    },

    create: (req, res) => {
        console.log(req.body);
        const comment = new Comment(req.body);
        const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
        //!THESE LINES WILL BE A PROBLEM user_id IS SET TO THE COMMENTER,
        //!NOT THE CURRENT PROFILE
        comment.posting_user_id = decodedJwt.payload._id;

        // craete a comment in the comment collection
        Comment.create(comment)
            .then((newComment) => {
                console.log("in create comment");
                console.log(newComment);
                // still need to update the User document to include this new comment _id
                User.findByIdAndUpdate(newComment.profile_user_id, 
                // this is the data that we want to update
                    {
                    $push: { comments: newComment._id } 
                    }, 
                    {
                    new: true,  // give me the new version...not the original
                    useFindAndModify: false,  // by default mongoose will replace the entire object
                    })
                    .populate("comments")
                    .populate("posting_user_id")
                        .then((updatedUserComments) => {
                            console.log("in comment controller, update user comments");
                            res.json(updatedUserComments);
                            })
                        .catch((err) => {
                            console.log("error found in add comment to user");
                            console.log(err);
                            res.status(400).json(err);
                        })
            })
            .catch((err) => {
            console.log("error found in create comment");
            console.log(err);
            res.status(400).json(err);
            })
    },
}