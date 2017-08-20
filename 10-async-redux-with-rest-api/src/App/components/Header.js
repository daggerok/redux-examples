import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTodoList } from '../../redux/actions/async';

const Header = ({ fetchTodoList }) => <div className='row'>
  <h4 onClick={fetchTodoList}>Let's get started!</h4>
</div>;

Header.propTypes = {
  fetchTodoList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchTodoList: filter => dispatch(fetchTodoList(filter)),
});

export default connect(null, mapDispatchToProps)(Header);
