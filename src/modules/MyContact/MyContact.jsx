import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './MyContactList/MyContactList';
import ContactFilter from './MyContactFilter/MyContactFilter';
import MyContactForm from './MyContactForm/MyContactForm';
import css from './myContact.module.css';

const MyContact = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('my-contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      return alert(`${name} is already is contacts`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const contactDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  };

  const FilteredContacts = getFilteredContacts();
  const isContacts = Boolean(FilteredContacts.length);

  return (
    <div>
      <h2 className={css.title}>Phonebook</h2>
      <MyContactForm onSubmit={addContact} />
      <div>
        <h3 className={css.title}>Contact</h3>
        <ContactFilter value={filter} handleChenge={handleFilter} />

        {isContacts && (
          <ContactList contactDelete={contactDelete} items={FilteredContacts} />
        )}
        {!isContacts && <p className={css.message}>No saved contacts</p>}
      </div>
    </div>
  );
};

export default MyContact;
