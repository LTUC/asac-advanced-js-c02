'use strict';

const express = require('express');
const cors = require('cors');
const Chance = require('chance');
const chance = new Chance();

const Queue = require('./lib/queue');
const queue = new Queue('api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post('/delivery/:store/:code', (req, res) => {

  if (!(req.params.store && req.params.code)) { throw 'Invalid Delivery Params'; }

  const message = {
    store: req.params.store,
    code: req.params.code,
  };

  queue.trigger('delivered', message);

  console.log('triggered', message);

  res.status(200).send(`${req.params.store} - ${req.params.code} Delivered ${new Date().toUTCString()}`);
});

app.post('/pickup', (req, res) => {

  let delivery = req.body || {
    store: '1-206-flowers',
    orderID: chance.guid(),
    customer: req.body.customer,
    address: req.body.address,
  };

  queue.trigger('pickup', delivery);
  res.status(200).send('scheduled');

});

app.listen(PORT, console.log(`API Server @ ${PORT}`));
