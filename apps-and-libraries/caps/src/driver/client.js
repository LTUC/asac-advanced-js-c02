'use strict';

const Queue = require('./lib/queue.js');
const queue = new Queue('driver');

queue.subscribe('pickup', (payload) => {
  console.log('Picking Up', payload);
  pickup(payload);
});

queue.trigger('getall', 'pickup');

function pickup(payload) {
  setTimeout(() => {
    queue.trigger('in-transit', payload);
    deliver(payload);
  }, 1000);
}

function deliver(payload) {
  setTimeout(() => {
    queue.trigger('delivered', payload);
  }, 1500);
}

