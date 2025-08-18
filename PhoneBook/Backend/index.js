// index.js
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const Person = require('./models/person');
const { unknownEndpoint, errorHandler } = require('./middleware/errorHandlers');

const app = express();

// ----- Middleware
app.use(cors());
app.use(express.json());

// Log method, url, status, time, and body for POST/PUT
morgan.token('body', (req) => (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// ----- DB connection
const { MONGODB_URI, PORT = 3001 } = process.env;

if (!MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in environment');
  process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ----- Routes

// GET all
app.get('/api/persons', async (_req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (err) { next(err); }
});

// Info (count + current time)
app.get('/info', async (_req, res, next) => {
  try {
    const count = await Person.countDocuments({});
    const time = new Date();
    res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
  } catch (err) { next(err); }
});

// GET by id
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'person not found' });
    res.json(person);
  } catch (err) { next(err); }
});

// CREATE
app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body || {};
    const person = new Person({ name, number });
    const saved = await person.save(); // runs Mongoose validations
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

// UPDATE (number only)
app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { number } = req.body || {};
    const updated = await Person.findByIdAndUpdate(
      req.params.id,
      { number }, // do not allow name changes via PUT here
      {
        new: true,            // return updated doc
        runValidators: true,  // enforce Mongoose validators on update
        context: 'query',
      }
    );
    if (!updated) return res.status(404).json({ error: 'person not found' });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'person not found' });
    res.status(204).end();
  } catch (err) { next(err); }
});

// 404 + error handler
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});