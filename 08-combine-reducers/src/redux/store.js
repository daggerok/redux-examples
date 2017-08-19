// read more: https://github.com/zalmoxisus/redux-devtools-extension
import { createStore } from 'redux';
import combineReducers from './reducers';

export const store = createStore(
  combineReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
