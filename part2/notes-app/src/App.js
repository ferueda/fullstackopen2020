import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import FilterNotes from './components/FilterNotes';

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState('');

  const handleNoteChange = e => {
    setNewNote(e.target.value);
  };

  const handleFilterChange = e => {
    setNewFilter(e.target.value);
    setShowAll(false);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/notes').then(response => {
      setNotes(response.data);
    });
  }, []);

  const addNote = e => {
    e.preventDefault();
    if (newNote !== '') {
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
        id: notes.length + 1
      };
      setNotes(notes.concat(noteObject));
      setNewNote('');
    }
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note =>
        note.content.toLowerCase().includes(newFilter.toLowerCase())
      );

  return (
    <div>
      <h1>Notes</h1>
      <NoteForm
        addNote={addNote}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
      />
      <FilterNotes
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Notes notes={notesToShow} />
    </div>
  );
};

export default App;
