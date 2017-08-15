import './index.css';
import './vendors';
//
import React from 'react';
import ReactDOM from 'react-dom';
//
import AppContainer from './App/App';
import registerServiceWorker from './service-worker/registerServiceWorker';
//
ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
//
registerServiceWorker();
