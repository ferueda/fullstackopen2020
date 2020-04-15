import anecdoteServices from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : action.data
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteServices.updateAnecdote(anecdote);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export default anecdoteReducer;
