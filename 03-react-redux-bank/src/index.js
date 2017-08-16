import './index.css';
//
import './vendors';
//
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//
import reducer from './redux-store/reducer';
//
import ReactReduxApp from './App/App';
import registerServiceWorker from './service-worker/registerServiceWorker';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxApp />
  </Provider>,
  document.getElementById('root')
);
//
registerServiceWorker();
