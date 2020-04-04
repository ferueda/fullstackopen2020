const personsRouter = require('express').Router();
const Person = require('../model/person');

personsRouter.get('/', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

personsRouter.get('../info', (req, res) => {
  Person.find({}).then((persons) => {
    const content = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
    res.send(content);
  });
});

personsRouter.get('/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(() => {
      res.status(404).end();
    });
});

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((returnedObject) => {
      res.json(returnedObject.toJSON());
    })
    .catch((error) => next(error));
});

personsRouter.post('/', (req, res, next) => {
  const person = new Person({
    ...req.body,
  });

  person
    .save()
    .then((person) => {
      res.json(person.toJSON());
    })
    .catch((error) => next(error));
});

personsRouter.put('/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((returnedObject) => {
      res.json(returnedObject.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
