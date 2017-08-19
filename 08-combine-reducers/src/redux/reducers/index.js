import { combineReducers } from 'redux';
import todoList from './todoList';
import filter from "./filter";

export default combineReducers({
  todoList,
  filter,
});
