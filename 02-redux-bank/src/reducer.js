const money = amount => parseFloat(parseFloat(amount || 0.0).toFixed(2));

export default (state = { balance: 0 }, action) => {
  // action: { type: 'deposit', payload: 11.0 }
  switch (action.type) {
    case 'DEPOSIT':
      return {
        balance: 0 < money(action.payload)
          ? money(state.balance + money(action.payload))
          : state.balance,
      };
    case 'WITHDRAWAL':
      return {
        balance: 0 < money(action.payload) && money(action.payload) <= state.balance
          ? money(state.balance - money(action.payload))
          : state.balance,
      };
    default:
      return state;
  }
};
