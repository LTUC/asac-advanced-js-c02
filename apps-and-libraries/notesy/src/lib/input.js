'use strict';

const minimist = require('minimist');

class Input {

  constructor() {
    const args = minimist(process.argv.slice(2));
    this.command = this.parse(args);
  }

  parse(args) {

    let argsMap = {
      a: 'add',
      add: 'add',
      d: 'delete',
      delete: 'delete',
      l: 'list',
      list: 'list',
    };

    // This should turn the CLI arg (--add or -a) into a valid command name like "add" or "delete"
    let command = Object.keys(args).filter(arg => argsMap[arg])[0];

    let action = argsMap[command];
    let category = args.c || args.category;
    let payload = typeof args[command] === 'string' ? args[command] : undefined;
    // Why this? Minimist library will make the value of an arg boolean true if it's there but has no value
    // that's not very useful..

    return { category, action, payload };
  }

  valid() {
    if (this.command.action.match(/add|delete/i)) { return !!this.command.payload; }
    return !!this.command.action;
  }
}

module.exports = Input;
