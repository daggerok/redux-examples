import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchInitialData } from '../../redux/actions/async';

const Header = ({ fetchInitialData }) => <div className='row'>
  <h4 onClick={fetchInitialData}>contact list</h4>
</div>;

Header.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchInitialData: filter => dispatch(fetchInitialData(filter)),
});

export default connect(null, mapDispatchToProps)(Header);
