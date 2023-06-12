import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';
import contactsDefault from '../../Data/contacts.json';
import ContactsList from 'components/ContactsList/ContactsList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  const LOC_CONTACTS = 'local_contacts';

  const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    const resultContacts = JSON.parse(localStorage.getItem(LOC_CONTACTS));
    if (resultContacts) {
      return resultContacts;
    }
    return contactsDefault;
  });

  useEffect(() => {
    localStorage.setItem(LOC_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const checkName = name => {
    return contacts.find(contact => contact.name === name);
  };

  const addContact = obj => {
    const { name, number } = obj;

    if (checkName(name)) {
      alert('Такий контакт вже існує !!!');
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts([newContact, ...contacts]);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };
  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };
  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const visibleContacts = getVisibleContact();
  return (
    <div className={css.content}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2 className={css.contact}>Contacts</h2>

      <Filter handleFilter={handleFilter} filter={filter} />

      <ContactsList
        visibleContacts={visibleContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};
