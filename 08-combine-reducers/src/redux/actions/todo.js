export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const addTodo = title => ({
  type: ADD_TODO,
  payload: title,
});

export const toggleTodo = title => ({
  type: TOGGLE_TODO,
  payload: title,
});

export const deleteTodo = title => ({
  type: DELETE_TODO,
  payload: title,
});
