import React, { useState } from 'react';
import Notes from './components/Notes';

const App = props => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(props.notes);
  const [showAll, setShowAll] = useState(true);

  const handleNoteChange = e => {
    setNewNote(e.target.value);
  };

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

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input
          type='text'
          placeholder='Note title...'
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Add note</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'important' : 'all'}{' '}
      </button>
      <Notes notes={notesToShow} />
    </div>
  );
};

export default App;
