import React from 'react';
import PropTypes from 'prop-types';

import { loyaltySingleByName } from 'utils';

import styles from './styles.scss';

const Loyalty = ({ company, className }) => (
  <div className={`${className||styles.loyalty} ${styles[company.loyalty]}`}>
    {loyaltySingleByName(company.loyalty)}
  </div>
);

Loyalty.propTypes = {
  company: PropTypes.shape({
    loyalty: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default Loyalty;