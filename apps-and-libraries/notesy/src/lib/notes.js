'use strict';

const notes = require('./model/notes-collection.js');

class Notes {

  constructor() {
  }

  async execute(opts) {
    switch (opts.action) {
    case 'add':
      return this.add(opts.payload, opts.category);
    case 'list':
      return this.list(opts.payload);
    case 'delete':
      return this.delete(opts.payload);
    default:
      return Promise.resolve();
    }
  }

  async add(text, category) {
    let newNote = { text, category };
    let note = await notes.create(newNote);
    console.log('Note Saved', note.text);
    return note;
  }

  async list(category) {
    let notesList = await notes.get(category);
    notesList.forEach(note => {
      console.log(note.text);
      console.log('');
      console.log(`  Category: ${note.category}\t ID: ${note.id}`);
      console.log('--------------------------------------------------\n');
    });
    return;
  }

  async delete(id) {
    await notes.delete(id)
      .then(() => console.log('Deleted Note', id));
    return;
  }

}

module.exports = Notes;
