import React from 'react';
import {connect} from 'react-redux';
import s from '../ContactList/ContactList.module.css';
import contactsActions from '../../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';

const ContactList = function ({ contacts, deleteContact }) {
  return (
    <ul>
         {contacts.map(e => {
          return (
            <li key={e.id} className={s.form__list}>
              <span>{e.name}: </span>
              <span>{e.number}</span>
              <button
                type="button"
                className={s.form__list_button}
                onClick={() => deleteContact(e.id)}
              >
                Delete contact
              </button>
            </li>
          );
        })}
    </ul>
  );
};

const filterContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLocaleLowerCase();
  return allContacts.filter(({name}) =>
    name.toLowerCase().includes(normalizedFilter),
  );
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

const mapStateToProps = ({contacts: {items, filter}}) => ({
  contacts: filterContacts(items, filter)
});

const mapDispatchToProps = dispatch => ({
  deleteContact: (id) => dispatch(contactsActions.deleteContact(id)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);