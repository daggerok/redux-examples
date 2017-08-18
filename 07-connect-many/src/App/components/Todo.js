import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ title, done, toggleTodo, deleteTodo, }) => <li className='row'>
  <input
    checked={done}
    type='checkbox'
    className='left'
    id={`checkbox-${title}`}
    onClick={() => toggleTodo(title)}
  />
  <label className='left' htmlFor={`checkbox-${title}`}>
    {title}
  </label>
  <i
    onClick={() => deleteTodo(title)}
    className='material-icons right'>delete</i>
</li>;

Todo.propTypes = {
  title: PropTypes.string,
  done: PropTypes.bool,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

export default Todo;
