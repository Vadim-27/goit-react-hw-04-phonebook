import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './MyContactList/MyContactList';
import ContactFilter from './MyContactFilter/MyContactFilter';
import MyContactForm from './MyContactForm/MyContactForm';
import css from './myContact.module.css';

const MyContact = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem("my-contacts"));
    return (contacts ? contacts : []);
  });

  const [filter, setFilter] = useState("");

  useEffect(() => { localStorage.setItem("my-contacts", JSON.stringify(contacts)) }, [contacts]);


  

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already is contacts`);
      return false;
    }
    setContacts(prevContacts => {
      
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevContacts, newContact];
    });
    return true;
  };

   const handleFilter = ({ target }) => {
    setFilter({ filter: target.value });
  };

  const contactDelete = id => {
    setContacts(({ contacts }) => {
      const newContact = contacts.filter(contact => contact.id !== id);
      return { contacts: newContact };
    });
  };
  const isDublicate = (name) => {
    const contactnormalized = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === contactnormalized;
    });
    return Boolean(result);
  }

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

  // render() {
  //   const { addConact, contactDelete, handleFilter } = this;

    const FilteredContacts = getFilteredContacts();
    const isContacts = Boolean(FilteredContacts.length);

    return (
      <div>
        <h2 className={css.title}>Phonebook</h2>
        <MyContactForm onSubmint={addContact} />
        <div>
          <h3 className={css.title}>Contact</h3>
          <ContactFilter handleChenge={handleFilter} />

          {isContacts && (
            <ContactList
              contactDelete={contactDelete}
              contacts={FilteredContacts}
            />
          )}
          {!isContacts && <p className={css.message}>No saved contacts</p>}
        </div>
      </div>
    );
  

}

// class MyContact extends Component {
//   state = {
//     items: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const items = JSON.parse(localStorage.getItem('my-contacts'));
//     if (items && items.length) {
//       this.setState({items})
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { items } = this.state;
//     if (prevState.items.length !== items.length) {
//       localStorage.setItem("my-contacts", JSON.stringify(items))
//     }
//   }

//   addConact = ({ name, number }) => {
//     if (this.isDublicate(name)) {
//       return alert(`${name} is olready is contacts`);
//     }
//     this.setState(prentState => {
//       const { items } = prentState;
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };
//       return { items: [newContact, ...items] };
//     });
    
//   };

//   handleFilter = ({ target }) => {
//     this.setState({ filter: target.value });
//   };

//   contactDelete = id => {
//     this.setState(({ items }) => {
//       const newConact = items.filter(item => item.id !== id);
//       return { items: newConact };
//     });
//   };
//   isDublicate(name) {
//     const contactnormalized = name.toLowerCase();
//     const result = this.state.items.find(item => {
//       return item.name.toLowerCase() === contactnormalized;
//     });
//     return Boolean(result);
//   }

//   getFilteredBooks() {
//     const { filter, items } = this.state;
//     if (!filter) {
//       return items;
//     }

//     const normalizedFilter = filter.toLowerCase();
//     const result = items.filter(({ name }) => {
//       return name.toLowerCase().includes(normalizedFilter);
//     });

//     return result;
//   }

//   render() {
//     const { addConact, contactDelete, handleFilter } = this;

//     const items = this.getFilteredBooks();
//     const isContacts = Boolean(items.length);

//     return (
//       <div>
//         <h2 className={css.title}>Phonebook</h2>
//         <MyContactForm onSubmint={addConact} />
//         <div>
//           <h3 className={css.title}>Contact</h3>
//           <ContactFilter handleChenge={handleFilter} />

//           {isContacts && (
//             <ContactList contactDelete={contactDelete} items={items} />
//           )}
//           {!isContacts && <p className={css.message}>No saved contacts</p>}
//         </div>
//       </div>
//     );
//   }
// }

export default MyContact;
