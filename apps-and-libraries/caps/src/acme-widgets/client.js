'use strict';

// sharing this dependency, for now
const Chance = require('chance');
const chance = new Chance();

const Queue = require('./lib/queue.js');
const companyID = 'acme-widgets';
const queue = new Queue(companyID);

queue.subscribe('delivered', (payload) => {
  console.log('Widgets Were Delivered', payload.code);
});

queue.subscribe('in-transit', (payload) => { });

queue.trigger('getall', 'delivered');


setInterval(() => {
  queue.trigger('pickup', {
    store: companyID,
    code: chance.guid(),
    orderID: chance.guid(),
    customer: `${chance.first()} ${chance.last()}`,
    address: `${chance.city()}, ${chance.state()}`,
  });
}, 1500);
