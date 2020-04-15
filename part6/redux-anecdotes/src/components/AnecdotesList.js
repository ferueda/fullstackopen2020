import React from 'react';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification';
import { filterChange } from '../reducers/filterReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter.status) {
      return anecdotes;
    }

    return anecdotes.filter((anecdote) =>
      anecdote.content.includes(filter.filter)
    );
  });

  const dispatch = useDispatch();

  const voteNotification = (id) => {
    dispatch(
      setNotification(
        {
          message: `You voted successfully for anecdote with id ${id}`,
        },
        5
      )
    );
  };

  const setFilter = (e) => {
    dispatch(filterChange(e.target.value));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <input type='text' placeholder='filter anecdotes' onChange={setFilter} />
      <Notification />
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  const updatedAnecdote = {
                    ...anecdote,
                    votes: anecdote.votes + 1,
                  };
                  dispatch(vote(updatedAnecdote));
                  voteNotification(anecdote.id);
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
