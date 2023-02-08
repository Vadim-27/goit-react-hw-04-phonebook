import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './myContactForm.module.css';

class MyContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmint = e => {
    e.preventDefault();
    const { onSubmint } = this.props;
    
     onSubmint({ ...this.state });
    
      this.reset();
  
  };
  reset() {
    this.setState({ name: '', number: '' });
  }

  handleChenge = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { name, number } = this.state;
    const { handleSubmint, handleChenge } = this;
    return (
      <form className={css.myForm} onSubmit={handleSubmint}>
        <label htmlFor="">Name</label>
        <input
          className={css.myFormInput}
          type="text"
          name="name"
          value={name}
          onChange={handleChenge}
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="">Number</label>
        <input
          className={css.myFormInput}
          type="tel"
          name="number"
          value={number}
          onChange={handleChenge}
          placeholder="Number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.myFormBtn} type="submint">
          {' '}
          Add contact
        </button>
      </form>
    );
  }
}

export default MyContactForm;
MyContactForm.propTypes = {
  onSubmint: PropTypes.func.isRequired,
};
