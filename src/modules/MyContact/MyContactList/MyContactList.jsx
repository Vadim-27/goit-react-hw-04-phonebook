import PropTypes from 'prop-types';

const ContactList = ({ contactDelete, contacts }) => {
  const contact = contacts.map(({ id, name, number }) => (
    <li key={id}>
      {name}:{number}
      <button type="button" onClick={() => contactDelete(id)}>
        Delete
      </button>
    </li>
  ));
  return <ul>{contact}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};
ContactList.propTypes = {
  contactDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
