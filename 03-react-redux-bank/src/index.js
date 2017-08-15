import './index.css';
import './vendors';
//
import React from 'react';
import ReactDOM from 'react-dom';
//
import ReactReduxApp from './App/App';
import registerServiceWorker from './service-worker/registerServiceWorker';
//
ReactDOM.render(
  <ReactReduxApp />,
  document.getElementById('root')
);
//
registerServiceWorker();
