import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdotesList';

const App = () => {
  return (
    <div>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
