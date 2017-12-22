import React from 'react';
import PropTypes from 'prop-types';

import AutocompleteCompany from '../AutocompleteCompany';
import styles from './styles.scss';

const AutocompletePopup = ({ companies }) => (
  <div className={styles.popup}>
    <ul className={styles.results}>
      {companies.map(company => (
        <li className={styles.row} key={company._id}>
          <AutocompleteCompany company={company} />
        </li>
      ))}
    </ul>
  </div>
);

AutocompletePopup.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default AutocompletePopup;