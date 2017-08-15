import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
//
import './App.css';
import reducer from './reducer';
import { doDeposit, doWithdrawal } from "./actions";

const Display = ({ balance }) => <div>
  <p>Account balance: {balance}</p>
</div>;

Display.propTypes = {
  balance: PropTypes.number,
};

const exec = (e, action, ref) => {
  if (!e.keyCode || e.keyCode !== 13) return;
  action(+ref.value);
  ref.value = '';
};

const Deposit = ({ doDeposit }) => {
  let ref;
  return <input placeholder="Deposit"
                ref={input => ref = input}
                onKeyDown={e => {
                  exec(e, doDeposit, ref);
                }}/>;
};

Deposit.propTypes = {
  doDeposit: PropTypes.func,
};

const Withdrawal = ({ doWithdrawal }) => {
  let ref;
  return <input placeholder="Withdrawal"
                ref={input => ref = input}
                onKeyDown={e => {
                  exec(e, doWithdrawal, ref);
                }}/>;
};

Withdrawal.propTypes = {
  doWithdrawal: PropTypes.func,
};

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
