import React, { useState, useEffect } from 'react';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import FilterNotes from './components/FilterNotes';
import noteService from './services/notes';

const Notification = ({ notification, message }) => {
  if (notification === null) {
    return null;
  } else if (notification === 'success') {
    return <div className='success'>{message}</div>;
  } else if (notification === 'error') {
    return <div className='error'>{message}</div>;
  }
};

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    padding: 10,
    backgroundColor: 'lightgrey',
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
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState('');

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
        setNotification('success');
        setMessage(`Note ${note.id} was updated successfully`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);
      })
      .catch(error => {
        setNotification('error');
        setMessage(`Note ${note.id} was already removed from server`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const addNote = e => {
    e.preventDefault();

    if (newNote !== '') {
      const noteObject = {
        content: newNote
      };

      noteService.create(noteObject).then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
        setNotification('success');
        setMessage('Note added successfully!');
        setTimeout(() => {
          setNotification(null);
        }, 2000);
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
      <Notification notification={notification} message={message} />
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
