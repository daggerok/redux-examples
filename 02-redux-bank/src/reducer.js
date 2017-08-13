export default (state = { balance: 0 }, action) => {
  // action: { type: 'deposit', payload: 11.0 }
  switch (action.type) {
    case 'DEPOSIT':
      return {
        balance: 0 < parseFloat(action.payload)
          ? parseFloat(state.balance) + parseFloat(action.payload) || 0
          : parseFloat(state.balance),
      };
    case 'WITHDRAWAL':
      return {
        balance: 0 < parseFloat(action.payload) && parseFloat(action.payload) <= parseFloat(state.balance)
          ? parseFloat(state.balance) - parseFloat(action.payload)
          : parseFloat(state.balance),
      };
    default:
      return state;
  }
};
