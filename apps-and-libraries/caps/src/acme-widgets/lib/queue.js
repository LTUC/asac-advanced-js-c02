'use strict';

const io = require('socket.io-client');

class Queue {

  constructor(id) {
    this.id = id;
    this.socket = io.connect('http://localhost:3001');
  }

  trigger(event, payload) {
    this.socket.emit(event, { clientID: this.id, payload });
  }

  subscribe(event, fn) {

    // First, tell the server we are subscribing
    this.socket.emit('subscribe', { event, clientID: this.id });

    // Now, register the actual listener
    this.socket.on(event, data => {
      let { messageID, payload } = data;
      this.socket.emit('received', { messageID, event, clientID: this.id });
      fn(payload);
    });
  }


}

module.exports = Queue;
