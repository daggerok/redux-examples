import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchInitialData } from '../../redux/actions/async';

const Header = ({ fetchInitialData }) => <div>
  <h3 className='header' onClick={fetchInitialData}>Contact List</h3>
</div>;

Header.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchInitialData: filter => dispatch(fetchInitialData(filter)),
});

export default connect(null, mapDispatchToProps)(Header);
