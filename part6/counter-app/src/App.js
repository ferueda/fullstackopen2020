import React from 'react';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import FilterNotes from './components/FilterNotes';

const App = () => {
  return (
    <div className='App'>
      <NotesForm />
      <FilterNotes />
      <NotesList />
    </div>
  );
};

export default App;
