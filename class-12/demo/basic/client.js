'use strict';
require('dotenv').config();

const ioClient = require('socket.io-client');

let host = `http://localhost:${process.env.PORT}/`;

const socket = ioClient.connect(host);

socket.on('sayHi', (payload) => {
    console.log('server said hi');
    setTimeout(() => {
        socket.emit('hiFromClient');
    }, 5000);
});