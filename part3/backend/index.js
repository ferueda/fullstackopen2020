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

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
];

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id == id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter(note => note.id !== id);

  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  let note = req.body;

  if (!note.content) {
    return res.status(400).json({ error: 'content missing' });
  }

  note = {
    ...note,
    id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 0,
    date: new Date().toISOString(),
    important: note.important || false
  };

  notes = notes.concat(note);

  res.json(notes);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
