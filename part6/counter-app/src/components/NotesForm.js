import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NotesForm = () => {
  const dispatch = useDispatch();

  const addNote = async (e) => {
    e.preventDefault();

    const content = e.target.note.value;

    dispatch(createNote(content));
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
