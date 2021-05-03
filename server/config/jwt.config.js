const jwt = require('jsonwebtoken');

module.exports = {
    authenticate(req, res, next) {
        // console.log(req.cookies);
        // console.log(req);
        jwt.verify(req.cookies.usertoken,
            process.env.JWT_SECRET,
            (err, payload) => {
                if(err) {
                    console.log(err);
                    // respond with 401 error code
                    res.status(401).json({ verified: false })
                } else {
                    console.log("all good");
                    next();
                }
        })
    }
}