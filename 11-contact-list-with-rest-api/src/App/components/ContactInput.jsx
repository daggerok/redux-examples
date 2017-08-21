import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContact } from '../../redux/actions/contact';

const ContactInput = ({ addContact }) => {
  let nameRef, phoneRef;
  return (
    <div className='col s12'>
      <div className='row'>
        <span className='input-field col s5'>
          <input
            type='text'
            id='contact-name'
            placeholder='name company or service'
            ref={input => nameRef = input}
          />
          <label htmlFor='contact-name'>
            <i className='material-icons small left'>account_circle</i>
          </label>
        </span>
        <span className='input-field col s6'>
          <input
            placeholder='phone, email, URL, address, etc'
            ref={input => phoneRef = input}
            id='contact-phone'
            type='text'
          />
          <label htmlFor='contact-name'>
            <i className='material-icons small left'>perm_phone_msg</i>
          </label>
        </span>
        {
          <span className='input-field col s1'>
            <i onClick={e => addContact(e, nameRef, phoneRef)}
               className='material-icons small right'>save</i>
          </span>
        }
      </div>
    </div>
  );
};

ContactInput.propTypes = {
  addContact: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addContact: (event, nameRef, phoneRef) => {
    event.preventDefault();
    if (event.keyCode && event.keyCode !== 13) return;
    if (!nameRef || !phoneRef || !nameRef.value || !phoneRef.value) return;
    const name = nameRef.value.trim();
    const phone = phoneRef.value.trim();
    dispatch(addContact({ name, phone, }));
    nameRef.value = phoneRef.value = '';
  },
});

export default connect(null, mapDispatchToProps)(ContactInput);
