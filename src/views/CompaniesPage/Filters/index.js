import React from 'react';
import PropTypes from 'prop-types';

import LoyaltyFilters from './LoyaltyFilters';
import CategoryFilters from './CategoryFilters';
import ViolationFilters from './ViolationFilters';
import styles from './styles.scss';

const Filters = ({ onChange }) => (
  <div className={styles.searchParams}>
    <form action="/companies" method="POST">
      <summary className={styles.searchParamsHeader}>Фільтри</summary>
      <div className={styles.searchParamsBody}>
        <LoyaltyFilters onChange={onChange} />
        <CategoryFilters onChange={onChange} />
        <ViolationFilters onChange={onChange} />
      </div>
    </form>
  </div>
);

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filters;
