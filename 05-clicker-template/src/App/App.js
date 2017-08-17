import './App.css';
//
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import { doSomething } from '../redux-store/actions';

const App = props => <div className='parent'>
  <div className='child'>
    <h2>TODO App</h2>
    <h4>Let's get started!</h4>
    <div>{props.payload}</div>
    <button className='waves-effect waves-light btn' onClick={() => {
      props.doSomething(props.payload);
    }}>click me</button>
  </div>
</div>;

App.propTypes = {
  payload: PropTypes.number,
  doSomething: PropTypes.func,
};

const mapStateToProps = state => ({
  payload: state.payload,
});

const mapDispatchToProps = dispatch => ({
  doSomething: payload => dispatch(doSomething(payload))
});

const TodoApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default TodoApp;
