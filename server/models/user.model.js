const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    // username
    username: {
        type: String,
        required: [true, "Username field is required!"]
    },
    // email
    email: {
        type: String,
        required: [true, "Email field is required!"]
    },
    // password
    password: {
        type: String,
        required: [true, "Password field is required!"],
        minLength: [8, "Password must be at least 8 characters!"]
    },

    profilePicture: {
        type: String,
        default: "C:/Users/Thomas/Desktop/CodingDojo/create-web/client/src/components/profilepic.svg"
    },

    bio: {
        type: String,
        default: "Personalize your bio!"
    },

    webs: {
        type: [String],
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],


}, { timestamps: true});

// we want to validate password === confirmPassword, but we don't want this in our DB!
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match!");
    }
    next();
});


// intercept the save function! (before we store anything)
// and "hash" the password before we store it!

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPw) => {
            this.password = hashedPw;
            next();
        })
});

const User = mongoose.model("User", UserSchema);

module.exports = User;