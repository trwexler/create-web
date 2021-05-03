const Post = require('../models/post.model');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

module.exports = {
    viewAll: (req, res) => {
        Post.find({})
            // .sort({ postDate : "descending" })
            .populate("user_id")
            .then((allPost) => {
                console.log("in all post");
                // console.log(allPost);
                res.json(allPost);
                })
            .catch((err) => {
                console.log("error found in getAll");
                res.status(400).json(err);
            })
    },

    create: (req, res) => {
        console.log(req.body);
        const post = new Post(req.body);
        const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });

        post.user_id = decodedJwt.payload._id;

        // craete a post in the post collection
        Post.create(post)
            .then((newPost) => {
            console.log("in create");
            console.log(newPost);

        // still need to update the Movie document to include this new post _id
        User.findByIdAndUpdate(newPost.user_id, 
        // this is the data that we want to update
            {
            $push: { posts: newPost._id } 
            }, 
            {
            new: true,  // give me the new version...not the original
            useFindAndModify: false,  // by default mongoose will replace the entire object
            })
            .populate("posts")
            // .populate("user_id")
                .then((updatedUserPosts) => {
                    console.log("in post controller, update user posts");
                    // console.log(updatedMovie);
                    // res.json(newPost);
                    res.json(updatedUserPosts);
                    })
                .catch((err) => {
                    console.log("error found in add post to movie");
                    console.log(err);
                    res.status(400).json(err);
                })
        })
                .catch((err) => {
                console.log("error found in create post");
                console.log(err);
                res.status(400).json(err);
                })
    },
}