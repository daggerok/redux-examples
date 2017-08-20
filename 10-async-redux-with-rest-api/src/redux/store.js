// read more: https://github.com/zalmoxisus/redux-devtools-extension
import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);