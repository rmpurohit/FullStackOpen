const mongoose = require('mongoose');

// Phone number validators:
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
      trim: true,        // ✅ suggestion #4
      unique: true,      // ✅ suggestion #2 (Mongoose will create a unique index)
      index: true,       // helps ensure index creation
    },
    number: {
      type: String,
      required: [true, 'number is required'],
      trim: true,        // ✅ suggestion #4
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
