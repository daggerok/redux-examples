import { DEPOSIT, WITHDRAWAL } from "./types";

const money = amount => parseFloat(parseFloat(amount || 0.0).toFixed(2));

export default (state = { balance: 0 }, action) => {

  const payload = money(action.payload);
  const balance = money(state.balance);

  if (isNaN(payload)) return state;

  switch (action.type) {
    case DEPOSIT:
      return {
        balance: 0 < payload
          ? money(balance + payload)
          : balance,
      };
    case WITHDRAWAL:
      return {
        balance: 0 < payload && balance >= payload
          ? money(balance - payload)
          : balance,
      };
    default:
      return state;
  }
};
