import React from 'react';
import css from './ContactList.module.css';
import { BsClipboard2Heart, BsPersonHeart } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact, toggleFavoriteContact } from 'redux/phoneBookSlice';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const toggleFavorite = contactId => {
    dispatch(toggleFavoriteContact(contactId));
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContactsByName = getVisibleContacts();
  const sortedFilteredContacts = [...filteredContactsByName].sort(
    (a, b) => b.favourite - a.favourite
  );

  return (
    <ul>
      {sortedFilteredContacts.map(contact => {
        return (
          <li className={css.contactItem} key={contact.id}>
            {contact.favourite && (
              <BsClipboard2Heart className={css.svgHeart} />
            )}
            {contact.name}: {contact.number}
            <button
              className={css.deleteBtn}
              onClick={() => handleDeleteContact(contact.id)}
            >
              &times;
            </button>
            <button
              className={css.deleteBtn}
              onClick={() => toggleFavorite(contact.id)}
            >
              <BsPersonHeart />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
