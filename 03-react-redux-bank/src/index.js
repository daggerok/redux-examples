import './index.css';
import './vendors';
//
import React from 'react';
import ReactDOM from 'react-dom';
//
import ReduxApp from './App/App';
import registerServiceWorker from './service-worker/registerServiceWorker';
//
ReactDOM.render(
  <ReduxApp />,
  document.getElementById('root')
);
//
registerServiceWorker();
