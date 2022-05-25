'use strict';

const uuid = require('uuid').v4;
const io = require('socket.io')(3001);

const messages = {};

io.on('connection', (socket) => {

  console.log('Connected', socket.id);

  // --------------------------------------------------- //
  // Event handlers that deal with the Queue and delivery
  // --------------------------------------------------- /

  // When a client gets a message, they should reply back with a received event
  // passing along the message id, event name, and client id
  // we can then delete it from their queue
  socket.on('received', payload => {
    let { messageID, event, clientID } = payload;
    delete messages[event][clientID][messageID];
  });

  // On a "getall", anything in the queue for a user, for an event gets re-sent
  socket.on('getall', (data) => {
    try {
      let event = data.payload;
      let clientID = data.clientID;
      for (const messageID in messages[event][clientID]) {
        let payload = messages[event][clientID][messageID];
        io.in(clientID).emit(event, { messageID, payload });
      }
    }
    catch (e) { }
  });

  socket.on('subscribe', payload => {
    let { event, clientID } = payload;
    // Set Up the queue for their message
    // This could/should be a function call!
    if (!messages[event]) { messages[event] = {}; }
    if (!messages[event][clientID]) { messages[event][clientID] = {}; }
    // Put each client in their own "room" so that they can don't have to sift through all broadcasts
    socket.join(clientID);
  });

  // --------------------------------------------------- //
  // The only actual event handler specific to this app
  // --------------------------------------------------- //

  socket.on('delivered', (message) => {

    // What is message? It's got extra properties in it from the
    // Queue library, so we'll need to only actually re-broadcast
    // the .payload within it.  Do a console.log() to see the whole thing

    let messageID = uuid();

    // Log that we trired to send each user a message
    // for (const subscriber in messages['delivered']) {
    //   messages['delivered'][subscriber][messageID] = message.payload;
    // }

    messages['delivered'][message.payload.store][messageID] = message.payload;

    // Send them all out
    // This would go to every connected client for this event
    // socket.broadcast.emit('delivered', { messageID, payload: message.payload });

    // Because we put each client in their own "room", this only goes to them...
    io.in(message.payload.store).emit('delivered', { messageID, payload: message.payload });
  });

  socket.on('pickup', (message) => {
    let messageID = uuid();
    // To the queue
    messages['pickup']['driver'][messageID] = message.payload;
    // To the driver
    io.in('driver').emit('pickup', { messageID, payload: message.payload });
  });

  socket.on('in-transit', (message) => {
    let messageID = uuid();
    // To the queue
    messages['in-transit'][message.payload.store][messageID] = message.payload;
    // To the store
    io.in(message.payload.store).emit('in-transit', { messageID, payload: message.payload });
  });

});
