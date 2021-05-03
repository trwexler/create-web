require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');
const cookieParser = require("cookie-parser");
const port = process.env.MY_PORT;

// configure app with functionality
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

app.use(cookieParser());


// access to the data
require('./config/mongoose.config');

// add in the routes

require('./routes/user.routes')(app);

const server = app.listen(port, () => console.log("Successfully connected on port " + port));

const io = socketio(server, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
  }
});

// need to start listening for someone to try and connect to our socket
//    on this server
io.on("connection", (socket) => {
  console.log('Server side socket id: ' + socket.id);

  socket.on('added_new_movie', (data) => {
    console.log("added_new_movie");
    console.log(data);
    socket.broadcast.emit('added_movie', data);
  });

});
