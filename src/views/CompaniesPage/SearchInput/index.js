import React from 'react';
import PropTypes from 'prop-types';

import { preventDefault } from 'utils';

import styles from './styles.scss';

const SearchInput = ({ value, innerRef, onSubmit }) => (
  <form action="/companies" method="POST" onSubmit={preventDefault(onSubmit)}>
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <input type="text"
          name="title"
          placeholder="Введіть назву компанії"
          defaultValue={value}
          ref={innerRef}
        />
      </div>
      <button type="submit" className={styles.button} />
    </div>
  </form>
);

SearchInput.propTypes = {
  value: PropTypes.string,
  innerRef: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchInput;
