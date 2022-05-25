import io from 'socket.io-client';

class Events {
  constructor(id, socketURL) {
    this.id = id;
    this.socket = io.connect(socketURL);
    this.socket.emit('join', id);
    console.log('connecting');
  }

  subscribe(event, fn) {
    this.socket.on(event, data => {
      fn(data);
    });
  }
}

export default Events;
