import './App.css';
//
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import Display from './components/Display';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
//
import { doDeposit, doWithdrawal } from '../redux-store/actions';

const App = ({ balance, onDeposit, onWithdrawal }) => <div className='parent'>
  <div className='child'>
    <h2>React Redux Bank</h2>
    <h3>Let's get started!</h3>
    <Display balance={balance}/>
    <Deposit doDeposit={onDeposit}/>
    <Withdrawal doWithdrawal={onWithdrawal}/>
  </div>
</div>;

App.propTypes = {
  balance: PropTypes.number,
  onDeposit: PropTypes.func,
  onWithdrawal: PropTypes.func
};

const mapStateToProps = state => ({
  balance: state.balance,
});

const mapDispatchToProps = dispatch => ({
  onDeposit: amount => dispatch(doDeposit(amount)),
  onWithdrawal: amount => dispatch(doWithdrawal(amount)),
});

const ReactReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ReactReduxApp;
