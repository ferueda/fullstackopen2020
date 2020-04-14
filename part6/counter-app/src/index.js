import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';
import { Provider } from 'react-redux';
import App from './App';

const store = createStore(noteReducer);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();
store.subscribe(renderApp);
