import React, { useState, useEffect } from 'react';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import FilterNotes from './components/FilterNotes';
import noteService from './services/notes';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className='error'>{message}</div>;
};

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    padding: 10,
    backgroundColor: 'lightgrey',
    border: 'solid 2px red',
    textAlign: 'center'
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2020
      </em>
    </div>
  );
};

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  }, []);

  const handleNoteChange = e => {
    setNewNote(e.target.value);
  };

  const handleFilterChange = e => {
    setNewFilter(e.target.value);
    setShowAll(false);
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
      })
      .catch(error => {
        setErrorMessage(`Note ${note.content} was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const addNote = e => {
    e.preventDefault();

    if (newNote !== '') {
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5
      };

      noteService.create(noteObject).then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
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
      <Notification message={errorMessage} />
      <NoteForm
        addNote={addNote}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
      />
      <FilterNotes
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Notes notes={notesToShow} toggleImportanceOf={toggleImportanceOf} />
      <Footer />
    </div>
  );
};

export default App;
