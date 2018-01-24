import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const wrapWithFunc = (fn, nextFn) => () => {
  const result = fn();
  nextFn();
  return result;
};

const SelectedFilters = ({ filters, onRemoveAll, onChange }) => {
  if (filters && filters.length > 0) {
    return (
      <ul className={styles.list}>
        {filters.map((item, index) => (
          <li key={index} className={styles.item}>
            {item.text}
            <button
              className={styles.remove}
              onClick={wrapWithFunc(item.onRemove, onChange)}
            />
          </li>
        ))}
        <li className={styles.all}>
          <button onClick={wrapWithFunc(onRemoveAll, onChange)}>
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
  onChange: PropTypes.func.isRequired,
};

export default SelectedFilters;
