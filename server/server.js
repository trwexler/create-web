require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const _ = require('lodash');
app.use('/image', express.static('public')); //to access the files in public folder

app.use(fileUpload({
  createParentPath: true
}));

const port = process.env.MY_PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
//also getting lockfile@1 errors and fsevent errors periodically that others are not. Had to update npm on the deployment/ubuntu terminal to get it working at all

app.use(cookieParser());
app.use(morgan('dev'));



// file upload api
// app.put('/api/upload', (req, res) => {

//     if (!req.files) {
//         return res.status(500).send({ msg: "file is not found" })
//     }
//         // accessing the file
//     const myFile = req.files.file;
//     console.log(req.files.file);
//     console.log(`THIS IS 39 ${__dirname}/public/${myFile.name}`);

//     //  mv() method places the file inside public directory
//     myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ msg: "Error occured" });
//         }
//         // returing the response with file path and name
//         return res.send({name: myFile.name, path: `/${myFile.name}`});
//     });
// })







require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);
require('./routes/comment.routes')(app);
require('./routes/document.routes')(app);
// require('./routes/file.routes')(app);


const server = app.listen(port, () => console.log("Successfully connected on port " + port));

