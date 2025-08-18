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

// Morgan (3.7–3.8): log tiny + POST bodies
morgan.token('body', (req) => (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// ----- DB connection
const { MONGODB_URI, PORT = 3001 } = process.env;

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ----- Routes

// 3.13: Fetch all people from DB
app.get('/api/persons', async (_req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (err) {
    next(err);
  }
});

// 3.18: Info uses DB count + current time
app.get('/info', async (_req, res, next) => {
  try {
    const count = await Person.countDocuments({});
    const time = new Date();
    res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
  } catch (err) {
    next(err);
  }
});

// 3.18: Get one by id from DB
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'person not found' });
    res.json(person);
  } catch (err) {
    next(err);
  }
});

// 3.14: Create (save to DB)
app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body || {};
    if (!name || !number) {
      return res.status(400).json({ error: 'name and number are required' });
    }

    const newPerson = new Person({ name: name.trim(), number: String(number).trim() });
    const saved = await newPerson.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// 3.17: Update number by id (PUT)
// Note: validators are added later in the course; for now, a simple update.
app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body || {};
    if (!name || !number) {
      return res.status(400).json({ error: 'name and number are required' });
    }

    const updated = await Person.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), number: String(number).trim() },
      { new: true } // return the updated document
    );

    if (!updated) return res.status(404).json({ error: 'person not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// 3.15: Delete (remove from DB)
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'person not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// ----- 404 + error handler (3.16)
app.use(unknownEndpoint);
app.use(errorHandler);

// ----- Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
