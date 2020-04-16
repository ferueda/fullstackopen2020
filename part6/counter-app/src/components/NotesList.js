import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import { connect } from 'react-redux';

const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={handleClick}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  );
};

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes;
    } else if (filter === 'IMPORTANT') {
      return notes.filter((note) => note.important);
    } else if (filter === 'NON-IMPORTANT') {
      return notes.filter((note) => !note.important);
    }
  });

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

const ConnectedNotes = connect()(NotesList);
export default ConnectedNotes;
