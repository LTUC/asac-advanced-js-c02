'use strict';
const client = require('socket.io-client');
const host = 'http://localhost:3000/family';
const socket = client.connect(host);


// const tasks = ['clean your room', 'wash you face', 'wear you clothes'];

console.log('process argv ', process.argv);
const tasks = process.argv.splice(2)
// socket.emit('new_task', 'clean your room');
// // socket.emit('new_task', 'wash you face');
// // socket.emit('new_task', 'wear you clothes');
tasks.forEach((task) => {
    socket.emit('new_task', task);
})

socket.on('added', (payload) => {
    console.log('Thank you for adding : ', payload, ' to msgQueue.');
    // socket.disconnect();
})
