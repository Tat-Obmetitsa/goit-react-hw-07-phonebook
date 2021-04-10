import React from 'react';
import s from '../App/App.module.css';
import AddContact from '../AddContact/AddContact';
import ContactList from '../ContactList/ContactList';
import SearchFilter from '../SearchFilter/SearchFilter';

const App = () => (
  <div className={s.container}>
  <h1 className={s.container__title}>Phonebook</h1>
  <AddContact />
  <h2 className={s.container__title}>Contacts</h2>
  <SearchFilter  />
  <ContactList />
</div>
);

export default App;
