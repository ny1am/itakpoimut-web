import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const SelectedFilters = ({ filters, onRemove }) => {
  if (filters && filters.length > 0) {
    return (
      <ul className={styles.list}>
        {filters.map((item, index) => (
          <li key={index} className={styles.item}>
            {item.text}
            {item.id &&
              <button className={styles.remove} onClick={() => onRemove(item)} />
            }
          </li>
        ))}
        <li className={styles.all}>
          <button onClick={() => onRemove()}>
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
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  onRemove: PropTypes.func.isRequired,
};

export default SelectedFilters;
