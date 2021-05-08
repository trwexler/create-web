const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // register new user accounts

    viewAll: (req, res) =>{
        User.find({})
            .then((allUsers)=>{
                console.log(allUsers);
                res.json(allUsers);
            })
            .catch((err)=>{
                console.log("error in ViewAll");
                res.status(400).json(err);
            })

    },

    getOne: (req, res) => {
        console.log(req.params.id);
        User.findById(req.params.id)
            .then((oneUser) => {
            console.log("in get one user");
            // console.log(oneMovie);
            res.json(oneUser);
            })
            .catch((err) => {
            console.log("error found in getOne");
            res.status(400).json(err);
            })
    },

    findMatchingWebUsers: (req, res) => {
        console.log(req.params.id);
        console.log(req.params.web);
        User.find({webs: req.params.web})
            .then((webUsers) => {
                console.log("in get findMatchingWebUsers");
                console.log(webUsers);
                res.json(webUsers);
            })
            .catch((err) => {
                console.log("error found in findMatchingWebUsers");
                res.status(400).json(err);
            })
    },



    edit: (req, res) => {
        console.log(req.params.id);
        User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  // give me the new version...not the original
            runValidators: true,  // by default mongoose will NOT validate on updates
        })
            .then((editedMovie) => {
                console.log("in edit movie");
                // console.log(updatedMovie);
                res.json(editedMovie);
            })
            .catch((err) => {
            console.log("error found in edit");
            res.status(400).json(err);
            })
    },
    
    register: (req, res) => {
        const user = new User(req.body);
        console.log(user);
        user.save()
            .then(() => {
                console.log("successfully registered");
                res.json({ message: "Successfully registered!", user: user})
            })
            .catch((err) => {
                console.log("register not successful!");
                res.status(400).json(err);
            });
    },
    // login
    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord) => {
                if(userRecord === null) {
                    res.status(400).json({ message: "Invalid login Attempt 1" })
                } else { //everything is compared in else.
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((passwordValid) => {
                            
                            if(passwordValid) {
                                console.log("Password is valid");
                                //Res has a cookie, 1st param name "usertoken",
                                //2nd param is jwt's sign method:
                                  //Holds: 1.obj of wanted info,
                                  //2.The obj process.env's string "JWT_Secret"
                                       // -set in .env
                                //Options obj added for security http/expires
                                res.cookie("usertoken", jwt.sign({
                                    _id: userRecord._id,
                                    username: userRecord.username
                                },  process.env.JWT_SECRET ), 
                                    
                                    {httpOnly: true, 
                                    expires: new Date(Date.now() + 900000000)}
                                    ) //ends cookie
                                .json({ //added onto cookie to output json
                                    message: "Successfully Logged In",
                                    userLoggedIn: {
                                        username: userRecord.username,
                                        _id: userRecord._id,
                                    }
                                })

                            } else {
                                res.status(400).json({ message: "Invalid Login Attempt 2"})
                            }
                        })
                        .catch(err => {
                            res.status(400).json({ message: "Invalid Login Attempt 3"});
                        })
                }
            })
            .catch(err => {
                res.status(400).json({ message: "Invalid Login Attempt 4"})
            })
    },
    logout: (req, res) => {
        console.log("logged out!");
        res.clearCookie("usertoken");
        res.json({ message: "You have successfully logged out!"});
    }
}