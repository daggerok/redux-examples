// read more: https://github.com/zalmoxisus/redux-devtools-extension
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(
  combineReducers,
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
