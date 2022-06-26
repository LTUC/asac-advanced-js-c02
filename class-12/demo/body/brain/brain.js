'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3030;

const ioServer = require('socket.io')(PORT);

//namespace
const healthSystem = ioServer.of('/health-system');
healthSystem.on('connection', (socket) => {
    console.log('connected to health system ', socket.id);
    socket.on('cold', (payload) => {
        healthSystem.emit('flu-warning', payload);
    });
});

ioServer.on('connection', (socket) => {
    console.log('connected ', socket.id);


    socket.on('light', (payload) => {
        ioServer.emit('brightness', { brightness: 75 });
        ioServer.emit('brightness', { brightness: 95 });

    });


});