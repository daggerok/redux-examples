import React from 'react';
import PropTypes from 'prop-types';
//
import exec from '../../utils/exec';

const Withdrawal = ({ doWithdrawal }) => {
  let ref;
  return <input placeholder='Withdrawal'
                ref={input => ref = input}
                onKeyDown={e => {
                  exec(e, doWithdrawal, ref);
                }}/>;
};

Withdrawal.propTypes = {
  doWithdrawal: PropTypes.func,
};

export default Withdrawal;
