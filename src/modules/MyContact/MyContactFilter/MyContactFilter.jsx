
import PropTypes from 'prop-types';
import css from "./myContactFilter.module.css"

const ContactFilter = ({ value, handleChenge }) => {
  return (
    <div className={css.filterBox}>
      <label htmlFor=""> Find contacts by name</label>
      <input
        className={css.myFormInput}
        type="text"
        name="filter"
        value={value}
        onChange={handleChenge}
        placeholder="Filter contact"
      />
    </div>
  );
};

export default ContactFilter;

ContactFilter.propTypes = {
  handleChenge: PropTypes.func.isRequired,
};