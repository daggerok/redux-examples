import { ADD_CONTACT } from '../actions/contact';
import { FETCH_DATA_RESPONSE } from '../actions/async';

/** todoList reducer */
export default (state = [], action) => {

  switch (action.type) {

    case FETCH_DATA_RESPONSE:
      return [...action.payload];

    case ADD_CONTACT:

      if (state.find(contact => contact.name === action.payload.name
          && contact.phone === action.payload.phone))
        return [...state];

      return [
        ...state,
        { ...action.payload, }
      ];

    default:
      return state;
  }
};
