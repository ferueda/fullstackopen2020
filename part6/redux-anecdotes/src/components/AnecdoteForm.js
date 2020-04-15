import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = '';
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name='anecdote' type='text' />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
