'use strict';

const schema = require('./notes-schema.js');

class Notes {

  constructor() {
  }

  get(category) {
    if (category) {
      return schema.find({ category });
    }
    else {
      return schema.find({});
    }
  }

  create(record) {
    let newRecord = new schema(record);
    return newRecord.save();
  }

  update(_id, record) {
    return schema.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return schema.findByIdAndDelete(_id);
  }

}

module.exports = new Notes();