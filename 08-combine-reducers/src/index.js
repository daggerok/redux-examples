import './index.css';
import './vendors';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './App/App';
import registerServiceWorker from './service-worker/registerServiceWorker';

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('root')
);

registerServiceWorker();
