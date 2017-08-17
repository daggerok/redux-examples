import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './types';

/** helpers */
const findTodoBy = (state, action) =>
  state.todoList.find(todo => todo.title === action.payload);

const indoxOf = (state, action) =>
  state.todoList.indexOf(findTodoBy(state, action));

const rightOf = (state, action) =>
  state.todoList.slice(0, indoxOf(state, action));

const leftOf = (state, action) =>
  state.todoList.slice(indoxOf(state, action) + 1, state.todoList.length);

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

      const togglingTodo = findTodoBy(state, action);
      const togglingRight = rightOf(state, action);
      const togglingLeft = leftOf(state, action);

      return {
        todoList: [
          ...togglingRight,
          { ...togglingTodo, done: !togglingTodo.done, },
          ...togglingLeft,
        ],
      };

    case DELETE_TODO:

      const deletingRight = rightOf(state, action);
      const deletingLeft = leftOf(state, action);

      return {
        todoList: [
          ...deletingRight,
          ...deletingLeft,
        ],
      };

    default:
      return state;
  }
};
