'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/`;
// let host = `http://localhost:5000/`; it will not work

const brainConnection = io.connect(host);


brainConnection.on('brightness', handleBrightness);

function handleBrightness(payload) {
    if (payload.brightness >= 90) {
        console.log('move your arms...');
    }
}