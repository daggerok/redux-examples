import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContact } from '../../redux/actions/contact';

const ContactInput = ({ addContact }) => {
  let nameRef, phoneRef;
  return (
    <div className='col s12'>
      <div className='row'>
        <span className='input-field col s4'>
          <input
            type='text'
            id='contact-name'
            placeholder='Name or company'
            ref={input => nameRef = input}
          />
          <label htmlFor='contact-name'>Name</label>
        </span>
        <span className='input-field col s7'>
          <input
            ref={input => phoneRef = input}
            placeholder='Phone, email, address, etc'
            id='contact-phone'
            type='text'
          />
          <label htmlFor='contact-phone'>Name</label>
        </span>
        <span className='input-field col s1'>
          <i onClick={e => addContact(e, nameRef, phoneRef)}
             className='material-icons right'>save</i>
        </span>
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
    if (!nameRef.value || !phoneRef.value) return;
    const name = nameRef.value.trim();
    const phone = phoneRef.value.trim();
    dispatch(addContact({ name, phone, }));
    nameRef.value = phoneRef.value = '';
  },
});

export default connect(null, mapDispatchToProps)(ContactInput);
