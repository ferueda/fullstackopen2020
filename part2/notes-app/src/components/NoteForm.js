import React from 'react';

const NoteForm = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <div>
      <form onSubmit={addNote}>
        <input
          type='text'
          placeholder='Note title...'
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Add note</button>
      </form>
    </div>
  );
};

export default NoteForm;
