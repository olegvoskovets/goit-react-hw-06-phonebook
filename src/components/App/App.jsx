import css from './App.module.css';

import ContactsList from 'components/ContactsList/ContactsList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  return (
    <div className={css.content}>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2 className={css.contact}>Contacts</h2>

      <Filter />

      <ContactsList />
    </div>
  );
};
