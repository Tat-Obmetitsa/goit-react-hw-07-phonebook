import React, { Component } from "react";
import { connect } from "react-redux";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import s from '../AddContact/AddContact.module.css';
import PropTypes from 'prop-types';
import shortid from 'shortid';

class AddContact extends Component {
  state = {
    name: '',
    number: '',
  };
  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number} = this.state;
    const { contacts } = this.props;
    const oldContact = contacts.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (oldContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (oldContact || name === '' || number === '') {
        alert('Add another contact name or number');
      } else {
        this.props.onSubmit(this.state);
      }

    this.reset();
  };
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };


  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.form_label} htmlFor={this.nameInputId}>
          Name
          <input
            className={s.form__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <label className={s.form_label} htmlFor={this.numberInputId}>
          Number
          <input
            className={s.form__input}
            type="text"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            id={this.numberInputId}
          />
        </label>

        <button type="submit" className={s.form__button}>
          Add contact
        </button>
      </form>
    );
  }
}
AddContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getAllContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (contact) => dispatch(contactsOperations.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
