import './App.css';
//
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
//
import { addTodo, toggleTodo, deleteTodo } from '../redux-store/actions';

const App = props => <div className='parent'>
  <div className='child'>
    <h2>TODO App</h2>
    <h4>Let's get started!</h4>
    <AddTodo addTodo={props.addTodo}/>
    <TodoList
      todoList={props.todoList}
      toggleTodo={props.toggleTodo}
      deleteTodo={props.deleteTodo}
    />
  </div>
</div>;

App.propTypes = {
  todoList: PropTypes.array,
  addTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

const mapStateToProps = state => ({
  todoList: state.todoList,
});

const mapDispatchToProps = dispatch => ({
  addTodo: title => dispatch(addTodo(title)),
  toggleTodo: title => dispatch(toggleTodo(title)),
  deleteTodo: title => dispatch(deleteTodo(title)),
});

const TodoApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default TodoApp;
