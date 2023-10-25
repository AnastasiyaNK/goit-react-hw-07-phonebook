import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: INITIAL_STATE,
  reducers: {
    addContact(state, action) {
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setfilter(state, action) {
      state.filter = action.payload;
    },
    toggleFavoriteContact(state, action) {
      state.contacts = state.contacts.map(contact => {
        if (contact.id === action.payload) {
          return { ...contact, favourite: !contact.favourite };
        }
        return contact;
      });
    },
  },
});

export const { addContact, deleteContact, setfilter, toggleFavoriteContact } =
  phoneBookSlice.actions;

export const phoneBookReducer = phoneBookSlice.reducer;
