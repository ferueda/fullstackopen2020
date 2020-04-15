import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' type='text' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
