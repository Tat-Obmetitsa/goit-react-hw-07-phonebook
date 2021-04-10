import React, { Component } from "react";
import { connect } from "react-redux";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import s from '../AddContact/AddContact.module.css';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      toast.configure();
      toast.error(`${name} is already in contacts`);
      return;
    }
    if (name === '' || number === '') {
      toast.configure();
      toast.error('Add another contact name or number');
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
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
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
            pattern="(^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$)"
            title="Номер телефона должен состоять из минимум 9 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
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
