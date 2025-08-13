const express = require('express');
const morgan = require('morgan');

const app = express();

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


// Built-in middleware
app.use(express.json());

// Use morgan with 'tiny' format
app.use(morgan('tiny'));

// Define a new token to log the request body for POST requests
morgan.token('post-data', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// Use a custom format string that includes 'post-data'
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :post-data')
);
  
const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    const nameExists = persons.some(
        person => person.name.trim().toLowerCase() === body.name.trim().toLowerCase()
        )

    if (nameExists) {
        return response.status(400).json({ 
            error: 'name already exists in phonebook' 
            })
    }

    if (!body.name || !body.number) {
        return response.status(400).json({ 
        error: 'name or number missing' 
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})