// models/person.js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
  {
    versionKey: false,
  }
);

// Pro tip for frontend: normalize id
personSchema.set('toJSON', {
  transform: (_doc, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
  },
});

const Person = mongoose.model('Person', personSchema, 'contacts');
module.exports = Person;
