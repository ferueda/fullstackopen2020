require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./model/person');

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(cors());
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(express.json());

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const content = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
    res.send(content);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person.toJSON());
    } else {
      res.status(404).end();
    }
  });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.deleteOne({ id: req.params.id })
    .then(deleted => {
      res.json(deleted);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

app.post('/api/persons', (req, res) => {
  const person = new Person({
    ...req.body
  });

  person.save().then(person => {
    res.json(person.toJSON());
  });
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
