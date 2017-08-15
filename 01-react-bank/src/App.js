import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Display = ({ balance }) => <div>
  <p>Account balance: {balance}</p>
</div>;

Display.propTypes = {
  balance: PropTypes.number,
};

const exec = (e, func, ref) => {

  if (!e.keyCode || e.keyCode !== 13) return;

  const int = parseInt(ref.value, 10);
  if (isNaN(int)) return;

  func(ref.value);
  ref.value = '';
  ref.focus();
};

const Deposit = ({ onDeposit }) => {

  let ref;

  return <input placeholder='Deposit'
                ref={input => ref = input}
                onKeyDown={e => exec(e, onDeposit, ref)}/>;
};

Deposit.propTypes = {
  onDeposit: PropTypes.func,
};

const Withdrawal = ({ onWithdrawal }) => {

  let ref;

  return <input placeholder='Withdrawal'
                ref={input => ref = input}
                onKeyDown={e => exec(e, onWithdrawal, ref)}/>;
};

Withdrawal.propTypes = {
  onWithdrawal: PropTypes.func,
};

const money = amount => parseFloat(parseFloat(amount || 0.0).toFixed(2));

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      balance: money(this.props.balance),
    };
  }

  onDeposit = amount => {

    const float = money(amount);

    if (float <= 0) return;

    this.setState({
      balance: money(this.state.balance + float),
    });
  };

  onWithdrawal = amount => {

    const float = money(amount);

    if (this.state.balance < float) return;

    this.setState({
      balance: money(this.state.balance - float),
    });
  };

  render() {
    return (
      <div className='parent'>
        <div className='child'>
          <h2>React Bank</h2>
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
