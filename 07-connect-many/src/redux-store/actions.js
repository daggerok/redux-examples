import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './types';

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
