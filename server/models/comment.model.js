const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

content: {
    type: String,
    required: [ true, "content is required" ],
    minlength: [ 3, "Your content must be at least 3 characters long" ],
},

likes: {
    type: Number,
    default: 0
},

user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},

username:{
    type: String
}



}, { timestamps: true })

module.exports = mongoose.model("Comment", CommentSchema);
