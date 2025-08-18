// models/person.js
const mongoose = require('mongoose');

// Phone number validators:
// A) Two or three digits, hyphen, then one or more digits (e.g., 09-123456, 040-555)
// B) Total digits >= 8 (ignoring hyphens)
const phoneValidator = [
  {
    validator: (v) => /^\d{2,3}-\d+$/.test(v),
    message: (props) => `${props.value} is not in the form NN-NNN... or NNN-NNN...`,
  },
  {
    validator: (v) => v.replace(/-/g, '').length >= 8,
    message: (props) => `${props.value} must contain at least 8 digits in total`,
  },
];

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      minLength: [3, 'name must be at least 3 characters long'],
      // Uncomment after creating a unique index in MongoDB for the collection
      // unique: true,
      // index: true,
    },
    number: {
      type: String,
      required: [true, 'number is required'],
      validate: phoneValidator,
    },
  },
  { versionKey: false }
);

// Normalize id for the frontend
personSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const Person = mongoose.model('Person', personSchema, 'contacts');
module.exports = Person;