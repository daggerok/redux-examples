import { SOMETHING } from './types';

export default (state = { payload: 1 }, action) => {

  const statePayload = state.payload;
  const actionPayload = parseFloat(action.payload);

  if (isNaN(actionPayload)) return state;

  switch (action.type) {

    case SOMETHING:
      return { payload: statePayload + actionPayload, };

    default:
      return state;
  }
};
