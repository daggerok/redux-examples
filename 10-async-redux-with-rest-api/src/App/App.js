import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "../redux/store";
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filter from "./components/Filter";

const TodoApp = () => <div className='parent'>
  <div className='child'>
    <h2>TODO App</h2>
    <Header/>
    <AddTodo/>
    <Filter/>
    <TodoList/>
  </div>
</div>;

export default () => <Provider store={store}>
  <TodoApp/>
</Provider>;
