import './index.css';
//
import './vendors';
//
import React from 'react';
import ReactDOM from 'react-dom';
// read more: https://github.com/zalmoxisus/redux-devtools-extension
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//
import reducer from './redux-store/reducer';
//
import TodoApp from './App/App';
import registerServiceWorker from './service-worker/registerServiceWorker';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
//
registerServiceWorker();
