'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/health-system`;
const brainConnection = io.connect(host);


brainConnection.on('flu-warning', handleFlu);

function handleFlu(payload) {
    console.log('running nose ', payload);
}

// this code will not work
// brainConnection.on('light', handLight);

// function handLight(payload) {
//     console.log('yes i can see', payload);
// }