import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactInput from './components/ContactInput';

const TodoApp = () => <div className='container'>
  <Header/>
  <ContactInput/>
  <ContactList/>
</div>;

export default () => <Provider store={store}>
  <TodoApp/>
</Provider>;
