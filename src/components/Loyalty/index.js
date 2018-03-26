import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

const labels = {
  disloyal: 'Порушник',
  probation: 'Випробувальний',
  loyal: 'Лояльна',
};

const Loyalty = ({ company, adaptive, className }) => (
  <div className={cn(
    styles.loyalty,
    { [styles.adaptive]: adaptive },
    styles[company.loyalty],
    className
  )}>
    {labels[company.loyalty]}
  </div>
);

Loyalty.propTypes = {
  company: PropTypes.shape({
    loyalty: PropTypes.string.isRequired,
  }).isRequired,
  adaptive: PropTypes.bool,
  className: PropTypes.string,
};

export default Loyalty;
