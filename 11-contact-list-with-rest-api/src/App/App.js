import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "../redux/store";
import Header from './components/Header';

const TodoApp = () => <div className='parent'>
  <div className='child'>
    <Header/>
  </div>
</div>;

export default () => <Provider store={store}>
  <TodoApp/>
</Provider>;
