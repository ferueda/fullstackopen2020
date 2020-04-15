import React from 'react';
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
