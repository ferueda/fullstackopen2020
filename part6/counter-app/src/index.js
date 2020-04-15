import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import App from './App';
import store from './store';

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
