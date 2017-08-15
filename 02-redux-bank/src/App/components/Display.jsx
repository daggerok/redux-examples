import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ balance }) => <div>
  <p>Account balance: {balance}</p>
</div>;

Display.propTypes = {
  balance: PropTypes.number,
};

export default Display;
