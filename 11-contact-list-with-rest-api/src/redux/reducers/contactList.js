import { FETCH_DATA_RESPONSE } from '../actions/async';
import {
  ADD_CONTACT, CANCEL_EDIT_CONTACT, SAVE_CONTACT_NAME, SAVE_CONTACT_PHONE, TOGGLE_EDIT_CONTACT_NAME,
  TOGGLE_EDIT_CONTACT_PHONE
} from '../actions/contact';

const withFalseInEdit = (contact, isNameInEdit = false, isPhoneInEdit = false) =>
  ({...contact, isNameInEdit, isPhoneInEdit, });

const findContact = (state, action) =>
  state.find(
    contact => contact.name === action.payload.name
      && contact.phone === action.payload.phone);

const isThatContact = (contact, action) =>
  contact.name === action.payload.name && contact.phone === action.payload.phone;

/** todoList reducer */
export default (state = [], action) => {

  switch (action.type) {

    case FETCH_DATA_RESPONSE:
      return [...action.payload.map(contact => withFalseInEdit(contact))];

    case ADD_CONTACT:

      const existedContact = findContact(state, action);

      if (existedContact)
        return [...state];

      return [
        ...state,
        withFalseInEdit(action.payload),
      ];

    case TOGGLE_EDIT_CONTACT_NAME:
      return [
        ...state.map(contact => ({
          ...contact,
          isNameInEdit: isThatContact(contact, action) ? !contact.isNameInEdit : false,
        })),
      ];

    case TOGGLE_EDIT_CONTACT_PHONE:
      return [
        ...state.map(contact => ({
          ...contact,
          isPhoneInEdit: isThatContact(contact, action) ? !contact.isPhoneInEdit : false,
        })),
      ];

    case CANCEL_EDIT_CONTACT:
      return [
        ...state.map(contact => withFalseInEdit(contact)),
      ];

    case SAVE_CONTACT_NAME:
      return [
        ...state.map(c => {
          if (c.name !== action.payload.prev) return c;
          return { ...c, name: action.payload.next, isNameInEdit: false };
        }),
      ];

    case SAVE_CONTACT_PHONE:
      return [
        ...state.map(c => (c.phone !== action.payload.prev)
          ? c : ({ ...c, phone: action.payload.next, isPhoneInEdit: false })),
      ];

    default:
      return state;
  }
};
