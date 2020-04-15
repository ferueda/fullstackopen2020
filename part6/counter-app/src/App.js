import React, { useEffect } from 'react';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import FilterNotes from './components/FilterNotes';

import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div className='App'>
      <NotesForm />
      <FilterNotes />
      <NotesList />
    </div>
  );
};

export default App;
