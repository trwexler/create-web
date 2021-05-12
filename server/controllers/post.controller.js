const Post = require('../models/post.model');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

module.exports = {
    
    viewAll: (req, res) => {
        Post.find({})
            // .sort({ postDate : "descending" })
            // .sort({'_id': 'asc'})
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

    getOne: (req, res) => {
        console.log(req.params.id);
        Post.findById(req.params.id)
            .then((onePost) => {
            console.log("in get one post");
            // console.log(oneMovie);
            console.log(res);
            res.json(onePost);
            })
            .catch((err) => {
            console.log("error found in getOne post");
            res.status(400).json(err);
            })
    },

    edit: (req, res) => {
        console.log(req.params.id);
        Post.findByIdAndUpdate(req.params.id, {
            $inc: {likes : 1}
        }, {
            new: true,  // give me the new version...not the original
            runValidators: true,  // by default mongoose will NOT validate on updates,
            useFindAndModify: false,
        })
            .then((editedPost) => {
                console.log("in edit post");
                res.json(editedPost);
            })
            .catch((err) => {
            console.log("error found in edit post");
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