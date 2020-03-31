const express = require('express');
const app = express();

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

  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const resBody = req.body;

  if (!resBody.name || !resBody.number) {
    return res.status(400).json({ error: 'missing name or number' });
  }

  const person = {
    ...resBody,
    id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 0
  };

  persons = persons.concat(person);

  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
