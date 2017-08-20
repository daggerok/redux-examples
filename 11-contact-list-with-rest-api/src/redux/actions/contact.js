export const ADD_CONTACT = 'ADD_CONTACT';
export const TOGGLE_EDIT_CONTACT_NAME = 'TOGGLE_EDIT_CONTACT_NAME';
export const TOGGLE_EDIT_CONTACT_PHONE = 'TOGGLE_EDIT_CONTACT_PHONE';
export const CANCEL_EDIT_CONTACT = 'CANCEL_EDIT_CONTACT';
export const SAVE_CONTACT_NAME = 'SAVE_CONTACT_NAME';
export const SAVE_CONTACT_PHONE = 'SAVE_CONTACT_PHONE';

export const addContact = contact => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const toggleEditContactName = contact => ({
  type: TOGGLE_EDIT_CONTACT_NAME,
  payload: contact,
});

export const toggleEditContactPhone = contact => ({
  type: TOGGLE_EDIT_CONTACT_PHONE,
  payload: contact,
});

export const cancelEditContact = contact => ({
  type: CANCEL_EDIT_CONTACT,
  payload: contact,
});

export const saveContactName = (prev, next) => ({
  type: SAVE_CONTACT_NAME,
  payload: { prev, next, },
});

export const saveContactPhone = (prev, next) => ({
  type: SAVE_CONTACT_PHONE,
  payload: { prev, next },
});
