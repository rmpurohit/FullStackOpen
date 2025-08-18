require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet'); // ✅ suggestion #6
const rateLimit = require('express-rate-limit'); // ✅ suggestion #6
const mongoose = require('mongoose');

const Person = require('./models/person');
const { unknownEndpoint, errorHandler } = require('./middleware/errorHandlers');

const app = express();

// ----- Middleware
app.use(helmet()); // ✅ basic security headers
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'] })); // tighten as needed
app.use(express.json());

// Rate limit (tweak to your needs)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter); // ✅ apply to API routes

// Conditional logging (less noisy in production)
if (process.env.NODE_ENV !== 'production') {
  morgan.token('body', (req) => (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : '');
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
}

// ----- DB connection
const { MONGODB_URI, PORT = 3001 } = process.env;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI in environment'); // no process.exit, let it throw
}

// Helpful Mongoose defaults
mongoose.set('strictQuery', false);
mongoose.set('runValidators', true);

// Retry/backoff connect
async function connectWithRetry(retries = 5, delayMs = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ Connected to MongoDB');

      // Ensure indexes (unique, etc.)
      await Person.syncIndexes(); // ✅ suggestion #2
      return;
    } catch (err) {
      console.error(`❌ MongoDB connect attempt ${attempt} failed:`, err.message);
      if (attempt === retries) {
        throw err; // bubble up for visibility
      }
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
}

// Call it
connectWithRetry().catch((err) => {
  console.error('❌ Could not establish DB connection:', err);
  // Let the process crash; a process manager (e.g. nodemon/PM2/docker) can restart it.
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully…');
  await mongoose.connection.close();
  process.exit(0);
});

// ----- Routes

// GET all
app.get('/api/persons', async (_req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (err) { next(err); }
});

// Info (count + current time) with content-negotiation (✅ suggestion #5)
app.get('/info', async (req, res, next) => {
  try {
    const count = await Person.countDocuments({});
    const time = new Date();

    if (req.accepts('html')) {
      return res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
    }
    // default JSON
    res.json({ count, time: time.toISOString() });
  } catch (err) { next(err); }
});

// GET by id
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'person not found', code: 'NOT_FOUND' }); // ✅ suggestion #3
    res.json(person);
  } catch (err) { next(err); }
});

// CREATE
app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body || {};
    const person = new Person({ name, number });
    const saved = await person.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

// UPDATE (number only)
app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { number } = req.body || {};
    const updated = await Person.findByIdAndUpdate(
      req.params.id,
      { number },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );
    if (!updated) return res.status(404).json({ error: 'person not found', code: 'NOT_FOUND' }); // ✅ suggestion #3
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'person not found', code: 'NOT_FOUND' }); // ✅ suggestion #3
    res.status(204).end();
  } catch (err) { next(err); }
});

// 404 + error handler
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
