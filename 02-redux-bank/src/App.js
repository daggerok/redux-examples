import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
//
import './App.css';
import reducer from './reducer';

const store = createStore(reducer);

const Display = ({ balance }) => <div>
  <p>Account balance: {balance}</p>
</div>;

Display.propTypes = {
  balance: PropTypes.number,
};

const money = amount => parseFloat(parseFloat(amount || 0.0).toFixed(2));

const exec = (e, func, ref) => {

  if (!e.keyCode || e.keyCode !== 13) return;

  const amount = money(ref.value);
  if (isNaN(amount)) return;

  func(ref.value);
  ref.value = '';
  ref.focus();
};

const Deposit = ({ onDeposit }) => {

  let ref;

  return <input placeholder="Deposit"
                ref={input => ref = input}
                onKeyDown={e => exec(e, onDeposit, ref)}/>;
};

Deposit.propTypes = {
  onDeposit: PropTypes.func,
};

const Withdrawal = ({ onWithdrawal }) => {

  let ref;

  return <input placeholder="Withdrawal"
                ref={input => ref = input}
                onKeyDown={e => exec(e, onWithdrawal, ref)}/>;
};

Withdrawal.propTypes = {
  onWithdrawal: PropTypes.func,
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      balance: money(this.props.balance),
    };
  }

  onDeposit = deposit => {

    const amount = money(deposit);

    if (amount <= 0) return;

    this.setState({
      balance: money(this.state.balance + amount),
    });
  };

  onWithdrawal = withdrawal => {

    const amount = money(withdrawal, 10);

    if (amount < 0) return;
    if (this.state.balance < amount) return;

    this.setState({
      balance: money(this.state.balance - amount),
    });
  };

  render() {
    return (
      <div className="parent">
        <div className="child">
          <h3>Let's get started!</h3>
          <Display balance={this.state.balance}/>
          <Deposit onDeposit={this.onDeposit}/>
          <Withdrawal onWithdrawal={this.onWithdrawal}/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  balance: PropTypes.number,
};

App.defaultProps = {
  balance: 0.0,
};

export default App;
