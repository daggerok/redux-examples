import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodo } from '../../redux/actions/todo';

const Todo = ({ title, done, toggleTodo, deleteTodo, }) => <li className='row'>
  <input
    checked={done}
    type='checkbox'
    className='left'
    readOnly={true}/* fix */
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
  title: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleTodo: title => dispatch(toggleTodo(title)),
  deleteTodo: title => dispatch(deleteTodo(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
