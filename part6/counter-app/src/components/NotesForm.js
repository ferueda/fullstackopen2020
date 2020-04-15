import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import noteServices from '../services/notes';

const NotesForm = () => {
  const dispatch = useDispatch();

  const addNote = async (e) => {
    e.preventDefault();

    const newNote = await noteServices.createNew(e.target.note.value);

    dispatch(createNote(newNote));
    e.target.note.value = '';
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>Add</button>
    </form>
  );
};

export default NotesForm;
