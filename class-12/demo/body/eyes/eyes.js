'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/`;
const brainConnection = io.connect(host);


brainConnection.on('brightness', handleBrightness);

function handleBrightness(payload) {
    if (payload.brightness >= 75) {
        console.log('close your eyes...');
    }
}