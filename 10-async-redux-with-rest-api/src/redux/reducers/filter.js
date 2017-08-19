import { CHANGE_FILTER, SHOW_ALL } from '../actions/filter';

/** todoList reducer */
export default (state = SHOW_ALL, action) => {
  switch (action.type) {

    case CHANGE_FILTER:
      return action.payload;

    default:
      return state;
  }
};
