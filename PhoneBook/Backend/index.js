// Phonebook backend
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// --- middleware ---
// parse JSON bodies
app.use(express.json());

// morgan logging
// tiny format + custom token to print body for POST requests
morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// --- in-memory data store ---
let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// --- helpers ---
const generateId = () => {
  // big enough range to avoid collisions; regenerate on conflict
  let id;
  do {
    id = String(Math.floor(Math.random() * 1_000_000_000));
  } while (persons.some((p) => p.id === id));
  return id;
};

const findById = (id) => persons.find((p) => p.id === id);

// --- routes ---

// all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// info page (count + current time)
app.get('/info', (req, res) => {
  const count = persons.length;
  const time = new Date();
  res.send(
    `<p>Phonebook has info for ${count} people</p><p>${time}</p>`
  );
});

// single person
app.get('/api/persons/:id', (req, res) => {
  const person = findById(req.params.id);
  if (!person) {
    return res.status(404).json({ error: 'person not found' });
  }
  res.json(person);
});

// delete person
app.delete('/api/persons/:id', (req, res) => {
  const exists = persons.some((p) => p.id === req.params.id);
  if (!exists) return res.status(404).json({ error: 'person not found' });

  persons = persons.filter((p) => p.id !== req.params.id);
  // 204 = no content
  res.status(204).end();
});

// create person w/ validation
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body || {};

  // basic validation
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: 'name and number are required' });
  }

  // uniqueness (case-insensitive to avoid duplicates like "Ada" vs "ada")
  const exists = persons.some(
    (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const newPerson = {
    id: generateId(),
    name: name.trim(),
    number: String(number).trim(),
  };

  persons.push(newPerson);
  res.status(201).json(newPerson);
});

// unknown endpoint helper (nice 404 for non-existing routes)
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});

// --- start server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
