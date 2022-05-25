#!/usr/bin/env node
'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notesy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const input = new Input();
const notes = new Notes();

if (input.valid()) {
  notes.execute(input.command)
    .then(mongoose.disconnect)
    .catch(error => console.error(error));
}
else {
  help();
}

function help() {
  console.log('Error!');
  process.exit();
}
