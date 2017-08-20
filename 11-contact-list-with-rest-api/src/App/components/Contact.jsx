import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleEditContactName,
  toggleEditContactPhone,
  cancelEditContact,
  saveContactName,
  saveContactPhone
} from '../../redux/actions/contact';

const isNameInEdit = contact => !!contact.isNameInEdit;
const isPhoneInEdit = contact => !!contact.isPhoneInEdit;

const Contact = ({
  contact,
  toggleEditContactName,
  toggleEditContactPhone,
  cancelEditContact,
  saveContactName,
  saveContactPhone
}) => {

  let nameRef, phoneRef;

  return (
    <div className='row'>
      <span className='input-field col s1'>
        {
          (isNameInEdit(contact) || isPhoneInEdit(contact))
          && <i onClick={() => {
               if (isNameInEdit(contact)) {
                 const next = nameRef && nameRef.value;
                 nameRef.value = '';
                 if (next) saveContactName(contact.name, nameRef);
               }
               if (isPhoneInEdit(contact)) {
                 console.log(contact.phone, phoneRef && phoneRef.value);
                 saveContactPhone(contact.phone, phoneRef);
                 phoneRef.value = '';
               }
             }} className='material-icons small'>save</i>
        }
      </span>
      <div className='col s5'>
        {
          isNameInEdit(contact)
            ? <input
                type='text'
                ref={input => nameRef = input}
                placeholder='name company or service'
                defaultValue={contact.name && contact.name}
                onChange={e => {
                  if (!phoneRef || !phoneRef.value) return;
                  saveContactPhone(contact, phoneRef.value);
                  phoneRef.value = '';
                }}
              />
            : <span className='flow-text'
                    onDoubleClick={() => toggleEditContactName(contact)}>
                {contact.name}
              </span>
        }
      </div>
      <div className='col s5'>
        {
          isPhoneInEdit(contact)
            ? <input
                defaultValue={contact.phone && contact.phone}
                placeholder='phone, email, URL, address, etc'
                ref={input => phoneRef = input}
                type='text'
              />
            : <span className='flow-text'
                    onDoubleClick={() => toggleEditContactPhone(contact)}>
                {contact.phone}
              </span>
        }
      </div>
      <span className='input-field col s1'>
        {
          (isNameInEdit(contact) || isPhoneInEdit(contact))
            ? <i onClick={() => {
                   if (isNameInEdit(contact)) saveContactName(contact, nameRef);
                   if (isPhoneInEdit(contact)) saveContactPhone(contact, phoneRef);
                 }}
                 className='material-icons small right'>cancel</i>
            : <i onClick={() => cancelEditContact(contact)}
                 className='material-icons small right'>more_vert</i>
        }
      </span>
    </div>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    isNameInEdit: PropTypes.bool,
    isPhoneInEdit: PropTypes.bool,
  }).isRequired,
  toggleEditContactName: PropTypes.func.isRequired,
  toggleEditContactPhone: PropTypes.func.isRequired,
  cancelEditContact: PropTypes.func.isRequired,
  saveContactName: PropTypes.func.isRequired,
  saveContactPhone: PropTypes.func.isRequired,
};

const genericDispatch = (dispatch, action, contact, ref) => {
  if (!ref || !ref.value || !ref.value.trim().length) return;
  dispatch(action(contact, ref.value.trim()));
  ref.value = '';
};

const mapDispatchToProps = dispatch => ({
  toggleEditContactName: contact => dispatch(toggleEditContactName(contact)),
  toggleEditContactPhone: contact => dispatch(toggleEditContactPhone(contact)),
  cancelEditContact: contact => dispatch(cancelEditContact(contact)),
  saveContactName: (prev, next) => dispatch(saveContactName(prev, next)),
  saveContactPhone: (prev, next) => dispatch(saveContactPhone(prev, next)),
});

export default connect(null, mapDispatchToProps)(Contact);
