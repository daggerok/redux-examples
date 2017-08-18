import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { connect } from 'react-redux';

const TodoList = ({ todoList, }) => <ul>
  {
    todoList && todoList.map((todo, key) =>
      <Todo key={key} {...todo}/>
    )
  }
</ul>;

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = state => ({
  todoList: state.todoList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
