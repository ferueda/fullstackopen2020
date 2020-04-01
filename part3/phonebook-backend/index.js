const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(cors());
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(express.json());

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Felipe Rueda',
    id: 4,
    number: '12333'
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const content = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
  res.send(content);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!persons.find(person => person.id === id)) {
    return res.status(400).json({ error: 'not such person' });
  }

  persons = persons.filter(person => person.id !== id);
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
  const resBody = req.body;

  if (!resBody.name || !resBody.number) {
    return res.status(400).json({ error: 'missing name or number' });
  }

  if (persons.some(p => p.name === resBody.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const person = {
    ...resBody,
    id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 0
  };

  persons = persons.concat(person);

  res.json(persons);
});

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const resBody = req.body;

  if (!persons.find(person => person.id === id)) {
    return res.status(400).json({ error: 'not such person' });
  }

  const index = persons.findIndex(person => person.id === id);

  persons[index] = {
    ...resBody
  };

  res.json(persons);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
