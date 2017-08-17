import React from 'react';
import PropTypes from 'prop-types';
//
import Todo from './Todo';

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
  todoList: PropTypes.array,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

export default TodoList;
