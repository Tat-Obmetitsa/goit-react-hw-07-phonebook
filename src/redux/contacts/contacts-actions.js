import {createAction} from '@reduxjs/toolkit';
import shortid from 'shortid';

const addContact = createAction('contacts/add', data => ({
    payload: {
        id: shortid.generate(),
        name: data.name,
        number: data.number,
      }
}));
const deleteContact = createAction('contacts/delete');

const changeFilter = createAction('contacts/changeFilter');

// eslint-disable-next-line 
export default {addContact, deleteContact, changeFilter};


// without Toolkit

// import types from './contacts-types';

// const addContact = (data) => ({
//     type: types.ADD,
//     payload: {
//         id: shortid.generate(),
//         name: data.name,
//         number: data.number,
//       }
// });

// const deleteContact = (id) => ({
//     type: types.DELETE,
//     payload: id,
// })
// const changeFilter = value => ({
//     type: types.CHANGE_FILTER,
//     payload: value,
// })