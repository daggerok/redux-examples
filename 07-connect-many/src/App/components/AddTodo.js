import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../../redux-store/actions';

const AddTodo = ({ addTodo }) => {
  let input;
  return (
    <form onSubmit={e => {
      e.preventDefault();
      if (!input.value || !input.value.trim()) return;
      addTodo(input.value);
      input.value = '';
    }}>
      <input type='text' ref={ref => input = ref}/>
    </form>
  );
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addTodo: title => dispatch(addTodo(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
