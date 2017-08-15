import { DEPOSIT, WITHDRAWAL } from './types';

export const doDeposit = amount => ({
  type: DEPOSIT,
  payload: amount,
});

export const doWithdrawal = amount => ({
  type: WITHDRAWAL,
  payload: amount
});
