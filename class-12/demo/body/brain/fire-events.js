'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}`;
const brainConnection = io.connect(host);
const healthConnection = io.connect(`${host}/health-system`);

brainConnection.emit('light');


healthConnection.emit('cold', { temp: -3 });