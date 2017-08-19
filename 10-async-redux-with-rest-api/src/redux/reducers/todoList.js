import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions/todo';

/** todoList reducer */
export default (state = [], action) => {

  switch (action.type) {

    case ADD_TODO:

      if (state.find(todo => todo.title === action.payload))
        return state;

      return [
        ...state,
        {
          title: action.payload,
          done: false,
        }
      ];

    case TOGGLE_TODO:

      const todo = state.find(todo => todo.title === action.payload);
      const index = state.indexOf(todo);
      const right = state.slice(0, index);
      const left = state.slice(index + 1, state.length);

      return [
        ...right,
        { ...todo, done: !todo.done, },
        ...left,
      ];

    case DELETE_TODO:

      return [
        ...state.filter(todo => todo.title !== action.payload),
      ];

    default:
      return state;
  }
};
