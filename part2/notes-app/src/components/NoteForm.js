import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (e) => {
    e.preventDefault();

    if (newNote !== '') {
      createNote({
        content: newNote,
        important: Math.random() > 0.5,
      });

      setNewNote('');
    }
  };

  return (
    <div className='formDiv'>
      <form onSubmit={addNote}>
        <input
          type='text'
          placeholder='Note title...'
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type='submit'>Add note</button>
      </form>
    </div>
  );
};

export default NoteForm;
