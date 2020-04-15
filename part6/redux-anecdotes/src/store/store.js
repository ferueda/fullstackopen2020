import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from '../reducers/anecdoteReducer';

const store = createStore(anecdoteReducer);

export default store;
