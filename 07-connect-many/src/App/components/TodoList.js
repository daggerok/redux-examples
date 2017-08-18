import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { connect } from "react-redux";
import { deleteTodo, toggleTodo } from "../../redux-store/actions";

const TodoList = ({ todoList, toggleTodo, deleteTodo, }) => <ul>
  {
    todoList && todoList.map((todo, key) =>
      <Todo
        key={key}
        {...todo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    )
  }
</ul>;

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todoList: state.todoList,
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: title => dispatch(toggleTodo(title)),
  deleteTodo: title => dispatch(deleteTodo(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
