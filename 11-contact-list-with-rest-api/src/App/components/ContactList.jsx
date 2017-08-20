import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Contact from './Contact';

const ContactList = ({ contactList }) => <div>
  {
    contactList && contactList.map((contact, key) =>
      <Contact contact={contact} key={key}/>
    )
  }
</div>;

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  contactList: state.contactList,
});

export default connect(mapStateToProps, null)(ContactList);
