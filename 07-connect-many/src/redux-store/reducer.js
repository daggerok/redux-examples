import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './types';

/** main */
export default (state = { todoList: [] }, action) => {

  switch (action.type) {

    case ADD_TODO:

      if (state.todoList.find(todo => todo.title === action.payload))
        return state;

      return {
        todoList: [
          ...state.todoList,
          {
            title: action.payload,
            done: false,
          }
        ],
      };

    case TOGGLE_TODO:

      const todo = state.todoList.find(todo => todo.title === action.payload);
      const index = state.todoList.indexOf(todo);
      const right = state.todoList.slice(0, index);
      const left = state.todoList.slice(index + 1, state.todoList.length);

      return {
        todoList: [
          ...right,
          { ...todo, done: !todo.done, },
          ...left,
        ],
      };

    case DELETE_TODO:

      return {
        todoList: [
          ...state.todoList.filter(todo => todo.title !== action.payload),
        ],
      };

    default:
      return state;
  }
};
