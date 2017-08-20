import React from 'react';
import PropTypes from 'prop-types';

const Contact = ({ contact }) => <div className='row'>
  <div className='col s5'>
    <span className='flow-text'>{contact.name}</span>
  </div>
  <div className='col s6'>
    <span className='flow-text'>{contact.phone}</span>
  </div>
</div>;

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
