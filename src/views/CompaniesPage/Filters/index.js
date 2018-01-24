import React from 'react';
import PropTypes from 'prop-types';

import LoyaltyFilters from './LoyaltyFilters';
import CategoryFilters from './CategoryFilters';
import ViolationFilters from './ViolationFilters';
import styles from './styles.scss';

const Filters = ({ refresh }) => (
  <div className={styles.searchParams}>
    <form action="/companies" method="POST">
      <summary className={styles.searchParamsHeader}>
        Фільтри
      </summary>
      <div className={styles.searchParamsBody}>
        <LoyaltyFilters refresh={refresh} />
        <CategoryFilters refresh={refresh} />
        <ViolationFilters refresh={refresh} />
      </div>
    </form>
  </div>
);

Filters.propTypes = {
  refresh: PropTypes.func.isRequired, 
};

export default Filters;
