import React from 'react';
import { createNote, toggleImportanceOf } from './reducers/noteReducer';
import { useSelector, useDispatch } from 'react-redux';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';

const App = () => {
  return (
    <div className='App'>
      <NotesForm />
      <NotesList />
    </div>
  );
};

export default App;
