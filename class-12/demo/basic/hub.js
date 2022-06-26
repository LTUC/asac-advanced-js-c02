//it will act like server.js

'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3030;

const socket = require('socket.io');


//this is my socket server
const ioServer = socket(PORT);

ioServer.on("connection", (socket) => {
    console.log("welcome to our socket connection - socket id: ", socket.id);

    setTimeout(() => {
        ioServer.emit('sayHi');
    }, 5000);

    socket.on('hiFromClient', (payload) => {
        console.log('client is saying hi');
    });
});