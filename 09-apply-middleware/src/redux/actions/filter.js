export const CHANGE_FILTER = 'CHANGE_FILTER';

export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_COMPLETE = 'SHOW_COMPLETE';
export const SHOW_INCOMPLETE = 'SHOW_INCOMPLETE';

export const changeFilter = (filter = SHOW_ALL) => ({
  type: CHANGE_FILTER,
  payload: filter,
});
