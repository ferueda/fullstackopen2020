import React from 'react';

const Note = ({ content }) => {
  return <p>{content}</p>;
};

const Notes = ({ notes }) => {
  return (
    <div>
      {notes.map(note => (
        <Note key={note.id} content={note.content} />
      ))}
    </div>
  );
};

export default Notes;
