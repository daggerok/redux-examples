import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { connect } from 'react-redux';
import { SHOW_ALL, SHOW_COMPLETE } from "../../redux/actions/filter";

const TodoList = ({ todoList }) => <ul>
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

/**
 * produces todoList according to provided filter:
 *
 * SHOW_ALL:        do not filter todoList
 * SHOW_COMPLETE:   filter todoList by condition if i.done === true
 * SHOW_INCOMPLETE: filter todoList ny if i.done === false
 */
const filterTodoList = (todoList, filter) =>
  filter === SHOW_ALL
    ? todoList
    : todoList.filter(i => (filter === SHOW_COMPLETE ? i.done : !i.done));

const mapStateToProps = state => ({
  todoList: filterTodoList(
    state.todoList,
    state.filter
  ),
});

export default connect(mapStateToProps, null)(TodoList);
