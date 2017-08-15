import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
//
import './App.css';
//
import Display from './components/Display';
import Deposit from './components/Deposit'
import Withdrawal from './components/Withdrawal'
//
import reducer from '../redux-store/reducer';
import { doDeposit, doWithdrawal } from "../redux-store/actions";

const App = ({ balance, doDeposit, doWithdrawal }) => (
  <div className="parent">
    <div className="child">
      <h3>Let's get started!</h3>
      <Display balance={balance}/>
      <Deposit doDeposit={doDeposit}/>
      <Withdrawal doWithdrawal={doWithdrawal}/>
    </div>
  </div>
);

App.propTypes = {
  balance: PropTypes.number,
  onDeposit: PropTypes.func,
  onWithdrawal: PropTypes.func
};

const store = createStore(reducer);

class AppContainer extends Component {

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  deposit(amount) {
    store.dispatch(doDeposit(amount));
  }

  withdrawal(amount) {
    store.dispatch(doWithdrawal(amount));
  }

  render() {
    const state = store.getState();
    return (
      <App balance={state.balance}
           doDeposit={this.deposit}
           doWithdrawal={this.withdrawal} />
    );
  }
}

export default AppContainer;
