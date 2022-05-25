'use strict';

const Chance = require('chance');
const chance = new Chance();

// sharing this dependency, for now
const Queue = require('./lib/queue.js');
const companyID = '1-206-flowers';
const queue = new Queue(companyID);

queue.subscribe('delivered', (payload) => {
  console.log('Flowers Were Delivered', payload.code);
});

queue.subscribe('in-transit', (payload) => { });

queue.trigger('getall', 'delivered');

setInterval( () => {
  queue.trigger('pickup', {
    store: companyID,
    code: chance.guid(),
    orderID: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  });
}, 1000);
