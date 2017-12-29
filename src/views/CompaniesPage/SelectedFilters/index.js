import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const SelectedFilters = ({ filters, onRemoveAll }) => {
  if (filters && filters.length > 0) {
    return (
      <ul className={styles.list}>
        {filters.map((item, index) => (
          <li key={index} className={styles.item}>
            {item.text}
            <button className={styles.remove} onClick={item.onRemove} />
          </li>
        ))}
        <li className={styles.all}>
          <button onClick={onRemoveAll}>
            Скинути всі
          </button>
        </li>
      </ul>
    );
  } else {
    return null;
  }
};

SelectedFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
  })),
  onRemoveAll: PropTypes.func.isRequired,
};

export default SelectedFilters;
