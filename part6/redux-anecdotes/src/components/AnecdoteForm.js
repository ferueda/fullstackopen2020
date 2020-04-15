import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';
import anecdoteServices from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();

    anecdoteServices
      .createNew(e.target.anecdote.value)
      .then((response) => dispatch(createAnecdote(response)));

    e.target.anecdote.value = '';
  };

  const noteAddedNotification = () => {
    dispatch(
      setNotification({
        message: 'Note added successfully',
      })
    );

    setInterval(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          addAnecdote(e);
          noteAddedNotification();
        }}
      >
        <div>
          <input name='anecdote' type='text' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;