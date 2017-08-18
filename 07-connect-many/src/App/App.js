import './App.css';
import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
// read more: https://github.com/zalmoxisus/redux-devtools-extension
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../redux-store/reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const TodoApp = () => <div className='parent'>
  <div className='child'>
    <h2>TODO App</h2>
    <h4>Let's get started!</h4>
    <AddTodo/>
    <TodoList/>
  </div>
</div>;

export default () => <Provider store={store}>
  <TodoApp/>
</Provider>;
