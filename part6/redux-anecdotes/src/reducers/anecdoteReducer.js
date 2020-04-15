const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(
        (anecdote) => anecdote.id === action.data.id
      );
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      return state;
  }
};

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data,
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      votes: 0,
    },
  };
};

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id,
    },
  };
};

export default anecdoteReducer;
