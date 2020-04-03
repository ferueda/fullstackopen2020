require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./model/person');

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms :body'));

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
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => {
      res.status(404).end();
    });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(returnedObject => {
      res.json(returnedObject.toJSON());
    })
    .catch(error => next(error));
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

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
