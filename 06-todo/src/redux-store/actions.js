import { SOMETHING } from './types';

export const doSomething = payload => ({
  type: SOMETHING,
  payload,
});
