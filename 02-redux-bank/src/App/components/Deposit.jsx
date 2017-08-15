import React from 'react';
import PropTypes from 'prop-types';
//
import exec from '../../utils/exec';

const Deposit = ({ doDeposit }) => {
  let ref;
  return <input placeholder='Deposit'
                ref={input => ref = input}
                onKeyDown={e => {
                  exec(e, doDeposit, ref);
                }}/>;
};

Deposit.propTypes = {
  doDeposit: PropTypes.func,
};

export default Deposit;
