import { combineReducers } from "redux";
import {createReducer} from '@reduxjs/toolkit';
import actions from './contacts-actions';


const items = createReducer([], {
   [actions.addContact]: (state, {payload}) => [...state, payload],
   [actions.deleteContact]: (state, {payload}) => state.filter(({id}) => id !== payload),
})

const filter = createReducer('', {
    [actions.changeFilter]: (_, {payload}) => payload,
})

export default combineReducers({
    items,
    filter
})


// without Toolkit

// const items = (state = [], {type, payload}) => { 
//     switch(type) {
//         case types.ADD:
//             return [...state, payload];
//         case types.DELETE:
//             return state.filter(({id}) => id !== payload);
//             default:  return state;
//     }
// }
// const filter = (state = '', {type, payload}) => { 
//     switch(type) {
//         case [actions.changeFilter]:
//             return payload;

//             default:  return state;
//     }
// }