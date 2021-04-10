import { createSelector } from 'reselect';

const getIsLoading = (state) => state.contacts.loading;

const getAllContacts = (state) => state.contacts.items;

const getFilter = (state) => state.contacts.filter;

const filterContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);


// eslint-disable-next-line
export default { getIsLoading, getAllContacts, getFilter, filterContacts };
