import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter, SHOW_ALL, SHOW_COMPLETE, SHOW_INCOMPLETE } from '../../redux/actions/filter';

const Filter = ({ changeFilter, }) => <div className='row'>
  <span onClick={() => changeFilter(SHOW_ALL)}>show all</span> {' | '}
  <span onClick={() => changeFilter(SHOW_COMPLETE)}>show complete</span> {' | '}
  <span onClick={() => changeFilter(SHOW_INCOMPLETE)}>show incomplete</span>
</div>;

Filter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  changeFilter: filter => dispatch(changeFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Filter);
