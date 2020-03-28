import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <li>
      <span>
        {note.content} [
        {note.important ? <strong>Important</strong> : 'Not important'}]
      </span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

const Notes = ({ notes, toggleImportanceOf }) => {
  return (
    <ul>
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => {
            toggleImportanceOf(note.id);
          }}
        />
      ))}
    </ul>
  );
};

export default Notes;
