const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
// check to make sure it is not a duplicate

name:{
    type: String,
    required: [ true, "name is required" ],
},

content: {
    type: String,
    required: [ true, "content is required" ],
},

likes: {
    type: Number,
    default: 0
},

user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},




}, { timestamps: true })

module.exports = mongoose.model("Document", DocumentSchema);
