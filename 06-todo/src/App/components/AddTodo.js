import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ addTodo }) => {
  let input;
  return (
    <form onSubmit={e => {
      e.preventDefault();
      if (!input.value || !input.value.trim()) return;
      addTodo(input.value);
      input.value = '';
    }}>
      <input type="text" ref={ref => input = ref}/>
    </form>
  );
};

AddTodo.propTypes = {
  addTodo: PropTypes.func,
};

export default AddTodo;
