import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import css from '../App/App.module.css';

const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const visibleContacts = getVisibleContact();
  return (
    <div className={css.contacts}>
      <ul className={css.numberList}>
        {visibleContacts.map(contact => (
          <li key={contact.id} className={css.contactItem}>
            <span>{contact.name}</span>
            <span className={css.number}> : {contact.number}</span>
            <button
              className={css.deleteBtn}
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
// ContactsList.propTypes = {
//   visibleContacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   deleteContact: PropTypes.func,
// };

export default ContactsList;
