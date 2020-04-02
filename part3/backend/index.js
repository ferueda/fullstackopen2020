require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Note = require('./models/note');

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(cors());
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes.map(note => note.toJSON()));
  });
});

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      res.json(note.toJSON());
    })
    .catch(error => {
      res.status(404).end();
    });
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter(note => note.id !== id);

  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  let body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });

  note.save().then(savedNote => {
    res.json(savedNote.toJSON());
  });
});

app.use(unknownEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
