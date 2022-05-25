'use strict';

jest.mock('minimist');
const minimist = require('minimist');

minimist.mockImplementation(() => {
  return {
    a: 'This is a note',
  }
});

const Input = require('../lib/input.js');

describe('Input Module', () => {

  it('parse() creates a good object', () => {
    let options = new Input();
    let command = options.parse({ a: 'test' });
    expect(command.action).toBeDefined();
    expect(command.payload).toBeDefined();
  });

  it('valid() respects a proper object', () => {
    let options = new Input();
    expect(options.valid()).toBeTruthy();
  });

  it('valid() rejects an invalid object', () => {
    let options = new Input();
    options.command = {}; // break it
    expect(options.valid()).toBeFalsy();
  });

});