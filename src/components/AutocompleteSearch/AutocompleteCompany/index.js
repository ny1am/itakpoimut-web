import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loyalty from 'components/Loyalty';

import styles from './styles.scss';

const AutocompleteCompany = ({ company }) => (
  <Link to={`/company/${company._id}`} className={styles.row}>
    <div className={styles.logo}>
      <img src={company.img} />
    </div>
    <div className={styles.title}>
      {company.title}
    </div>
    <div className={styles.loyalty}>
      <Loyalty company={company} />
    </div>
  </Link>
);

AutocompleteCompany.propTypes = {
  company: PropTypes.object.isRequired
};

export default AutocompleteCompany;
