import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const labels = {
  disloyal: 'Порушник',
  probation: 'Випробувальний',
  loyal: 'Лояльна',
};

const Loyalty = ({ company, className }) => (
  <div className={`${className||styles.loyalty} ${styles[company.loyalty]}`}>
    {labels[company.loyalty]}
  </div>
);

Loyalty.propTypes = {
  company: PropTypes.shape({
    loyalty: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default Loyalty;
